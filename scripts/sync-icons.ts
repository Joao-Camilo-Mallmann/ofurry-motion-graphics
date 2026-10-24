import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'D:\\YT\\YT\\Icones';
const TARGET_DIR = path.resolve(process.cwd(), 'public', 'icons');

// Name normalization map to clean up filenames (lowercase, kebab-case, no spaces)
const FILENAME_NORMALIZATIONS: Record<string, string> = {
  'Arrow_Up_Down-removebg.png': 'arrow-up-down.png',
  'bank.png': 'bank.png',
  'basket.png': 'basket.png',
  'bitcoin.png': 'bitcoin.png',
  'blockchain.png': 'blockchain.png',
  'brain.png': 'brain.png',
  'brazil.png': 'brazil.png',
  'car eletric.png': 'car-electric.png',
  'certificate.png': 'certificate.png',
  'Charcoal_JE3_BE3.webp': 'charcoal.webp',
  'chart-gain.png': 'chart-gain.png',
  'chart-lose.png': 'chart-lose.png',
  'clipboard-paper.png': 'clipboard.png',
  'confidence.png': 'confidence.png',
  'copper.png': 'copper.png',
  'cristal ball.png': 'crystal-ball.png',
  'datacenter.png': 'datacenter.png',
  'dolar.webp': 'dollar.webp',
  'edit video.png': 'edit-video.png',
  'egg-icon.png': 'egg.png',
  'eggs.png': 'eggs.png',
  'email.png': 'email.png',
  'family.png': 'family.png',
  'gold.png': 'gold.png',
  'gold2.png': 'gold-bars.png',
  'hand.png': 'hand.png',
  'house.png': 'house.png',
  'istockphoto-1187099020-612x612-removebg-preview.png': 'gamepad.png',
  'key.png': 'key.png',
  'lighting.png': 'lightning.png',
  'lottery.png': 'lottery.png',
  'miner.png': 'miner.png',
  'money.png': 'money.png',
  'nuclear usine.png': 'nuclear-plant.png',
  'OMGGG.png': 'crash-arrow.png',
  'paper.png': 'paper.png',
  'pc.png': 'pc.png',
  'pen-drive.png': 'pen-drive.png',
  'pig-bank2.png': 'piggy-bank-line.png',
  'piggy-bank.png': 'piggy-bank.png',
  'pilar.png': 'pillar.png',
  'Play.png': 'play.png',
  'roube.png': 'thief.png',
  'security.png': 'security.png',
  'share.png': 'share.png',
  'silent.webp': 'silent.webp',
  'sistyem.png': 'system.png',
  'smarphone.png': 'smartphone.png',
  'square.png': 'square.png',
  'user.png': 'user.png',
  'wallet.png': 'wallet.png',
  'Warning.svg.png': 'warning.png',
  'wind.png': 'wind.png',
  'world.png': 'world.png',
  'X.png': 'x-mark.png',
};

async function syncIcons() {
  console.log('🔄 Sincronizando ícones de:', SOURCE_DIR);
  console.log('🎯 Destino:', TARGET_DIR);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Diretório de origem não encontrado: ${SOURCE_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log('📁 Diretório public/icons/ criado.');
  }

  const files = fs.readdirSync(SOURCE_DIR);
  let syncedCount = 0;

  for (const file of files) {
    const srcFile = path.join(SOURCE_DIR, file);
    const stat = fs.statSync(srcFile);
    if (!stat.isFile()) continue;

    const normalizedName = FILENAME_NORMALIZATIONS[file] || file.toLowerCase().replace(/\s+/g, '-');
    const destFile = path.join(TARGET_DIR, normalizedName);

    fs.copyFileSync(srcFile, destFile);

    // Also copy with original name if different, for compatibility
    if (normalizedName !== file) {
      const aliasFile = path.join(TARGET_DIR, file);
      fs.copyFileSync(srcFile, aliasFile);
    }

    syncedCount++;
  }

  console.log(`✅ ${syncedCount} ícones sincronizados com sucesso em public/icons/!`);
}

syncIcons().catch((err) => {
  console.error('❌ Erro durante o sync de ícones:', err);
  process.exit(1);
});
