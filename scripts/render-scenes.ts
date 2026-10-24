import path from 'path';
import fs from 'fs';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia, RenderMediaOnProgress } from '@remotion/renderer';

interface RenderOptions {
  format: 'prores' | 'webm' | 'mp4';
  video?: string;
  trecho?: string;
  scene?: string;
  full?: boolean;
  outDir: string;
  entryPoint: string;
}

function parseArgs(): RenderOptions {
  const args = process.argv.slice(2);
  let format: 'prores' | 'webm' | 'mp4' = 'prores';
  let video: string | undefined = undefined;
  let trecho: string | undefined = undefined;
  let scene: string | undefined = undefined;
  let full: boolean = false;
  let customOutDir: string | undefined = undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--format=')) {
      const f = arg.split('=')[1].toLowerCase();
      if (f === 'prores' || f === 'webm' || f === 'mp4') {
        format = f;
      }
    } else if (arg.startsWith('--video=')) {
      video = arg.split('=')[1].trim();
    } else if (arg.startsWith('--trecho=')) {
      const t = arg.split('=')[1].trim().toLowerCase();
      trecho = t.startsWith('trecho-') ? t : `trecho-${t.padStart(2, '0')}`;
    } else if (arg === '--trecho') {
      const nextArg = args[i + 1];
      if (nextArg && (nextArg.toLowerCase().startsWith('trecho-') || /^\d+$/.test(nextArg))) {
        const t = nextArg.trim().toLowerCase();
        trecho = t.startsWith('trecho-') ? t : `trecho-${t.padStart(2, '0')}`;
        i++;
      }
    } else if (arg.startsWith('--scene=')) {
      scene = arg.split('=')[1].trim();
    } else if (arg.startsWith('--id=')) {
      scene = arg.split('=')[1].trim();
    } else if (arg === '--full') {
      full = true;
    } else if (arg.startsWith('--outDir=')) {
      customOutDir = path.resolve(process.cwd(), arg.split('=')[1].trim());
    } else if (!arg.startsWith('-')) {
      // Positional argument: video -> [trecho] -> [scene]
      if (!video) {
        video = arg.trim();
      } else if (!trecho && (arg.toLowerCase().startsWith('trecho-') || /^\d+$/.test(arg))) {
        const val = arg.trim().toLowerCase();
        trecho = val.startsWith('trecho-') ? val : `trecho-${val.padStart(2, '0')}`;
      } else if (!scene) {
        scene = arg.trim();
      }
    }
  }

  // If rendering full sequence and format was not explicitly set to prores/webm, default to mp4
  if (full && !args.some((a) => a.startsWith('--format='))) {
    format = 'mp4';
  }

  let outDir: string;
  if (customOutDir) {
    outDir = customOutDir;
  } else if (video && trecho) {
    outDir = path.resolve(process.cwd(), 'videos', video, 'output', trecho, 'render');
  } else if (video) {
    outDir = full
      ? path.resolve(process.cwd(), 'videos', video, 'out', 'full')
      : path.resolve(process.cwd(), 'videos', video, 'out', 'scenes');
  } else {
    outDir = full
      ? path.resolve(process.cwd(), 'out', 'full')
      : path.resolve(process.cwd(), 'out', 'scenes');
  }

  return {
    format,
    video,
    trecho,
    scene,
    full,
    outDir,
    entryPoint: path.resolve(process.cwd(), 'src/index.ts'),
  };
}

async function main() {
  const options = parseArgs();
  console.log('====================================================');
  console.log('🎬 OFurry Motion Renderer (Incremental & Scoped Engine)');
  if (options.video) {
    console.log(`📁 Target Video:  ${options.video.toUpperCase()}`);
  }
  if (options.trecho) {
    console.log(`🎞️ Target Trecho: ${options.trecho.toUpperCase()}`);
  }
  console.log(`📦 Output format: ${options.format.toUpperCase()} (Alpha: ${options.format !== 'mp4'})`);
  console.log(`💾 Destination:   ${options.outDir}`);
  if (options.full) {
    console.log(`🎥 Mode:          Full Sequence (full.${options.format === 'prores' ? 'mov' : options.format})`);
  } else if (options.scene) {
    console.log(`🎯 Target Scene:  ${options.scene}`);
  } else {
    console.log(`🎞️ Mode:          All Scenes for ${options.trecho ? `${options.video}/${options.trecho}` : (options.video ?? 'All Videos')}`);
  }
  console.log('====================================================\n');

  if (!fs.existsSync(options.outDir)) {
    fs.mkdirSync(options.outDir, { recursive: true });
  }

  console.log('⏳ Bundling Remotion project...');
  const bundleStartTime = Date.now();
  const bundleLocation = await bundle({
    entryPoint: options.entryPoint,
    webpackOverride: (config) => config,
  });
  console.log(`✓ Bundled in ${((Date.now() - bundleStartTime) / 1000).toFixed(1)}s\n`);

  console.log('🔍 Discovering compositions...');
  const compositions = await getCompositions(bundleLocation);

  let targetCompositions = compositions;

  // Mode 1: Trecho-scoped filter
  if (options.trecho) {
    const trechoTarget = options.trecho.toLowerCase();
    const videoTarget = (options.video ?? '').toLowerCase();

    targetCompositions = compositions.filter((c) => {
      const idLower = c.id.toLowerCase();
      const matchesVideo = !videoTarget || idLower.startsWith(`${videoTarget}-`);
      const matchesTrecho = idLower.includes(trechoTarget);
      return matchesVideo && matchesTrecho;
    });

    if (options.full) {
      targetCompositions = targetCompositions.filter((c) => c.id.toLowerCase().endsWith('-full'));
    } else {
      // Filter out full sequence compositions when targeting scenes
      targetCompositions = targetCompositions.filter((c) => !c.id.toLowerCase().endsWith('-full'));

      if (options.scene) {
        const target = options.scene.toLowerCase();
        const numTarget = target.replace(/^0+/, '').padStart(2, '0');
        targetCompositions = targetCompositions.filter((c) => {
          const idLower = c.id.toLowerCase();
          return (
            idLower === target ||
            idLower.includes(`-cena-${numTarget}-`) ||
            idLower.includes(`-cena-${target}-`) ||
            idLower.endsWith(`-${target}`)
          );
        });
      }
    }
  } else if (options.full) {
    // Mode 2: Full Sequence Mode (Video-level)
    const videoTarget = (options.video ?? '').toLowerCase();
    targetCompositions = compositions.filter((c) => {
      const idLower = c.id.toLowerCase();
      if (videoTarget) {
        return (
          idLower === `${videoTarget}-full-sequence` ||
          idLower === `${videoTarget}composition` ||
          idLower.startsWith(`${videoTarget}-full`)
        );
      }
      return idLower.includes('full-sequence') || idLower.includes('composition');
    });
  } else {
    // Mode 3: Video-level / Global Scene Filter
    targetCompositions = compositions.filter((c) => {
      const idLower = c.id.toLowerCase();
      if (idLower.includes('full-sequence') || idLower.endsWith('composition') || idLower === 'placeholder' || idLower.endsWith('-full')) {
        return false;
      }
      if (options.video) {
        return idLower.startsWith(`${options.video.toLowerCase()}-`);
      }
      return idLower.includes('-cena-') || idLower.startsWith('scene-') || idLower.includes('cena');
    });

    if (options.scene) {
      const target = options.scene.toLowerCase();
      const numTarget = target.replace(/^0+/, '').padStart(2, '0');
      
      const exactOrIndexMatches = targetCompositions.filter((c) => {
        const idLower = c.id.toLowerCase();
        return (
          idLower === target ||
          idLower.includes(`-cena-${numTarget}-`) ||
          idLower.includes(`-cena-${target}-`) ||
          idLower.endsWith(`-${target}`)
        );
      });

      if (exactOrIndexMatches.length > 0) {
        targetCompositions = exactOrIndexMatches;
      } else {
        targetCompositions = targetCompositions.filter((c) => {
          const idLower = c.id.toLowerCase();
          return idLower.includes(target);
        });
      }
    }
  }

  if (targetCompositions.length === 0) {
    console.error(`❌ No compositions found matching criteria: video=${options.video || 'any'}, trecho=${options.trecho || 'none'}, scene=${options.scene || 'all'}, full=${options.full}`);
    console.log('Available compositions were:');
    compositions.forEach((c) => console.log(`  - ${c.id}`));
    process.exit(1);
  }

  console.log(`Found ${targetCompositions.length} composition(s) to render.\n`);

  // Codec and container configurations
  const codecConfig = {
    prores: {
      codec: 'prores' as const,
      proResProfile: '4444' as const,
      pixelFormat: 'yuva444p10le' as const,
      imageFormat: 'png' as const,
      extension: 'mov',
    },
    webm: {
      codec: 'vp9' as const,
      pixelFormat: 'yuva420p' as const,
      imageFormat: 'png' as const,
      extension: 'webm',
    },
    mp4: {
      codec: 'h264' as const,
      pixelFormat: 'yuv420p' as const,
      imageFormat: 'jpeg' as const,
      extension: 'mp4',
    },
  }[options.format];

  for (let i = 0; i < targetCompositions.length; i++) {
    const comp = targetCompositions[i];
    let fileName: string;

    if (options.full) {
      fileName = `full.${codecConfig.extension}`;
    } else if (options.trecho) {
      // Clean scene file name if matched trecho pattern (e.g. coe-trecho-01-Cena-01-gancho -> 01-gancho.webm)
      const match = comp.id.match(new RegExp(`${options.trecho}-Cena-(.+)$`, 'i'));
      if (match && match[1]) {
        fileName = `${match[1]}.${codecConfig.extension}`;
      } else {
        fileName = `${comp.id}.${codecConfig.extension}`;
      }
    } else {
      fileName = `${comp.id}.${codecConfig.extension}`;
    }

    const outputFile = path.join(options.outDir, fileName);


    console.log(`▶ [${i + 1}/${targetCompositions.length}] Rendering: ${comp.id}`);
    console.log(`  ⏱ Duration: ${comp.durationInFrames} frames (${(comp.durationInFrames / comp.fps).toFixed(1)}s)`);
    console.log(`  💾 Output:   ${outputFile}`);

    const renderStartTime = Date.now();

    const onProgress: RenderMediaOnProgress = ({ progress }) => {
      const pct = Math.floor(progress * 100);
      process.stdout.write(`\r  ⚡ Progress: ${pct}%`);
    };

    await renderMedia({
      composition: comp,
      serveUrl: bundleLocation,
      codec: codecConfig.codec,
      proResProfile: (codecConfig as { proResProfile?: '4444' }).proResProfile,
      pixelFormat: codecConfig.pixelFormat,
      imageFormat: codecConfig.imageFormat,
      outputLocation: outputFile,
      onProgress,
      overwrite: true,
    });

    const durationSec = ((Date.now() - renderStartTime) / 1000).toFixed(1);
    console.log(`\r  ✓ Complete in ${durationSec}s                               \n`);
  }

  console.log('🎉 Render job completed successfully!');
}

main().catch((err) => {
  console.error('Render error:', err);
  process.exit(1);
});
