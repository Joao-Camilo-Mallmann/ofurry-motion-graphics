import React from 'react';
import { Composition, Series } from 'remotion';

// Load Motion Design Font Packages Locally for Instant Deterministic Rendering
import '@fontsource/archivo-black';
import '@fontsource/bebas-neue';
import '@fontsource/syne';
import '@fontsource/space-grotesk';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/montserrat';

import { OFurryTheme } from './theme/ofurry';
import { SceneComposer } from './composition/SceneComposer';
import { SceneSpec } from './director/schema';
import { getAllVideos } from './videos/registry';
import { VideoScene, isBespokeScene } from './videos/types';
import { SHOTCRAFT_V1_PRESETS } from './presets';
import { LucideAnimatedShowcase } from './lucide-animated/LucideAnimatedShowcase';
import { HouseTimeline } from './house/HouseTimeline';
import { HOUSE_SHEETS } from './house/sheets';

export interface MainVideoProps {
  scenes: VideoScene[];
  transparent?: boolean;
}

export const ShotcraftShowcaseSeries: React.FC<{ transparent?: boolean }> = ({ transparent = true }) => {
  return (
    <Series>
      {SHOTCRAFT_V1_PRESETS.map((preset) => {
        const Component = preset.component;
        return (
          <Series.Sequence
            key={preset.id}
            durationInFrames={preset.defaultDurationInFrames}
            name={`${preset.category}: ${preset.name}`}
          >
            <Component transparent={transparent} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

export const MainVideo: React.FC<MainVideoProps> = ({ scenes, transparent = false }) => {
  return (
    <Series>
      {scenes.map((scene) => {
        const duration = scene.durationInFrames ?? 90;
        return (
          <Series.Sequence
            key={scene.id}
            durationInFrames={duration}
            name={scene.id}
          >
            {isBespokeScene(scene) ? (
              <scene.component transparent={transparent} />
            ) : (
              <SceneComposer scene={scene as SceneSpec} transparent={transparent} />
            )}
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

export const RemotionRoot: React.FC = () => {
  const videos = getAllVideos();

  return (
    <>
      {videos.length === 0 && (
        <Composition
          id="Placeholder"
          component={() => null}
          durationInFrames={30}
          fps={OFurryTheme.layout.fps}
          width={OFurryTheme.layout.width}
          height={OFurryTheme.layout.height}
        />
      )}

      {videos.map((video) => {
        const scenesList = video.scenes ?? [];
        const totalVideoFrames = Math.max(
          1,
          scenesList.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0)
        );
        const fps = video.fps ?? OFurryTheme.layout.fps;
        const width = video.width ?? OFurryTheme.layout.width;
        const height = video.height ?? OFurryTheme.layout.height;

        return (
          <React.Fragment key={video.id}>
            {/* Composição de Sequência Completa do Vídeo */}
            {scenesList.length > 0 && (
              <Composition
                id={`${video.id}-Full-Sequence`}
                component={
                  (video.fullSequenceComponent ?? MainVideo) as unknown as React.FC<Record<string, unknown>>
                }
                durationInFrames={totalVideoFrames}
                fps={fps}
                width={width}
                height={height}
                defaultProps={{
                  scenes: scenesList,
                  transparent: false,
                }}
              />
            )}

            {/* Mini-Vídeos Individuais por Cena com Canal Alpha NATIVO */}
            {scenesList.map((scene, idx) => {
              const sceneNumber = String(idx + 1).padStart(2, '0');
              const compId = `${video.id}-Cena-${sceneNumber}-${scene.id}`;
              const duration = scene.durationInFrames ?? 90;
              const sceneFps = isBespokeScene(scene) ? (scene.fps ?? fps) : fps;
              const sceneWidth = isBespokeScene(scene) ? (scene.width ?? width) : width;
              const sceneHeight = isBespokeScene(scene) ? (scene.height ?? height) : height;

              if (isBespokeScene(scene)) {
                return (
                  <Composition
                    key={`${video.id}-${scene.id}`}
                    id={compId}
                    component={scene.component as unknown as React.FC<Record<string, unknown>>}
                    durationInFrames={duration}
                    fps={sceneFps}
                    width={sceneWidth}
                    height={sceneHeight}
                    defaultProps={{
                      transparent: true,
                    }}
                  />
                );
              }

              return (
                <Composition
                  key={`${video.id}-${scene.id}`}
                  id={compId}
                  component={SceneComposer as unknown as React.FC<Record<string, unknown>>}
                  durationInFrames={duration}
                  fps={sceneFps}
                  width={sceneWidth}
                  height={sceneHeight}
                  defaultProps={{
                    scene,
                    transparent: true,
                  }}
                />
              );
            })}

            {/* Trechos Incrementais (output/trecho-XX/) */}
            {video.trechos?.map((trecho) => {
              const trechoFrames = Math.max(
                1,
                trecho.scenes.reduce((acc, s) => acc + (s.durationInFrames ?? 90), 0)
              );

              return (
                <React.Fragment key={`${video.id}-${trecho.id}`}>
                  {/* Sequência Completa do Trecho */}
                  <Composition
                    id={`${video.id}-${trecho.id}-Full`}
                    component={
                      (trecho.fullSequenceComponent ?? MainVideo) as unknown as React.FC<Record<string, unknown>>
                    }
                    durationInFrames={trechoFrames}
                    fps={fps}
                    width={width}
                    height={height}
                    defaultProps={{
                      scenes: trecho.scenes,
                      transparent: true,
                    }}
                  />

                  {/* Cenas Individuais do Trecho com Canal Alpha */}
                  {trecho.scenes.map((scene, idx) => {
                    const sceneNumber = String(idx + 1).padStart(2, '0');
                    const compId = `${video.id}-${trecho.id}-Cena-${sceneNumber}-${scene.id}`;
                    const duration = scene.durationInFrames ?? 90;
                    const sceneFps = isBespokeScene(scene) ? (scene.fps ?? fps) : fps;
                    const sceneWidth = isBespokeScene(scene) ? (scene.width ?? width) : width;
                    const sceneHeight = isBespokeScene(scene) ? (scene.height ?? height) : height;

                    if (isBespokeScene(scene)) {
                      return (
                        <Composition
                          key={`${video.id}-${trecho.id}-${scene.id}`}
                          id={compId}
                          component={scene.component as unknown as React.FC<Record<string, unknown>>}
                          durationInFrames={duration}
                          fps={sceneFps}
                          width={sceneWidth}
                          height={sceneHeight}
                          defaultProps={{
                            transparent: true,
                          }}
                        />
                      );
                    }

                    return (
                      <Composition
                        key={`${video.id}-${trecho.id}-${scene.id}`}
                        id={compId}
                        component={SceneComposer as unknown as React.FC<Record<string, unknown>>}
                        durationInFrames={duration}
                        fps={sceneFps}
                        width={sceneWidth}
                        height={sceneHeight}
                        defaultProps={{
                          scene,
                          transparent: true,
                        }}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Estilo da casa: folhas de batidas (skill ofurry-house-motion) */}
      {HOUSE_SHEETS.map((sheet) => {
        const fps = sheet.fps ?? OFurryTheme.layout.fps;
        return (
          <React.Fragment key={sheet.id}>
            <Composition
              id={sheet.id}
              component={HouseTimeline as unknown as React.FC<Record<string, unknown>>}
              durationInFrames={Math.round(sheet.duration * fps)}
              fps={fps}
              width={OFurryTheme.layout.width}
              height={OFurryTheme.layout.height}
              defaultProps={{ sheet, transparent: false }}
            />
            <Composition
              id={`${sheet.id}-Alpha`}
              component={HouseTimeline as unknown as React.FC<Record<string, unknown>>}
              durationInFrames={Math.round(sheet.duration * fps)}
              fps={fps}
              width={OFurryTheme.layout.width}
              height={OFurryTheme.layout.height}
              defaultProps={{ sheet, transparent: true }}
            />
          </React.Fragment>
        );
      })}

      {/* Teste do Lucide Animated deterministico */}
      <Composition
        id="LucideAnimated-Showcase"
        component={LucideAnimatedShowcase as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={180}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{ transparent: false }}
      />

      {/* ========================================================= */}
      {/* SHOTCRAFT V1 PRESETS SHOWCASE & COMPOSIÇÕES INDIVIDUAIS   */}
      {/* ========================================================= */}
      <Composition
        id="Shotcraft-V1-Showcase"
        component={ShotcraftShowcaseSeries as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={SHOTCRAFT_V1_PRESETS.reduce((acc, p) => acc + p.defaultDurationInFrames, 0)}
        fps={OFurryTheme.layout.fps}
        width={OFurryTheme.layout.width}
        height={OFurryTheme.layout.height}
        defaultProps={{ transparent: true }}
      />

      {SHOTCRAFT_V1_PRESETS.map((preset, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const compId = `Preset-${num}-${preset.id}`;
        return (
          <Composition
            key={preset.id}
            id={compId}
            component={preset.component as unknown as React.FC<Record<string, unknown>>}
            durationInFrames={preset.defaultDurationInFrames}
            fps={OFurryTheme.layout.fps}
            width={OFurryTheme.layout.width}
            height={OFurryTheme.layout.height}
            defaultProps={{ transparent: true }}
          />
        );
      })}
    </>
  );
};
