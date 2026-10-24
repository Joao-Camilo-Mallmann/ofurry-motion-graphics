import { VideoPackage, VideoScene, isBespokeScene } from './types';
import { trecho01Package } from '../../videos/coe/output/trecho-01/scenes';
import { trecho02Package } from '../../videos/coe/output/trecho-02/scenes';
import { trecho03Package } from '../../videos/coe/output/trecho-03/scenes';
import { trecho04Package } from '../../videos/coe/output/trecho-04/scenes';

/**
 * Registry of all production video packages in the project.
 * Videos registered here will automatically be discovered by Remotion Studio and the CLI render scripts.
 */
export const coeVideoPackage: VideoPackage = {
  id: 'coe',
  title: 'Por Que COE É Uma Merda',
  trechos: [trecho01Package, trecho02Package, trecho03Package, trecho04Package],
};

export const videoRegistry: Record<string, VideoPackage> = {
  coe: coeVideoPackage,
};

/**
 * Register a video package in the registry.
 */
export function registerVideo(video: VideoPackage): void {
  videoRegistry[video.id] = video;
}

/**
 * Retrieve a registered video package by ID (case-insensitive).
 */
export function getVideo(id: string): VideoPackage | undefined {
  if (videoRegistry[id]) return videoRegistry[id];
  const target = id.toLowerCase();
  return Object.values(videoRegistry).find((v) => v.id.toLowerCase() === target);
}

/**
 * Get all registered video packages as an array.
 */
export function getAllVideos(): VideoPackage[] {
  return Object.values(videoRegistry);
}

/**
 * Get a list of all registered video IDs.
 */
export function listVideoIds(): string[] {
  return Object.keys(videoRegistry);
}

/**
 * Find a specific scene within a registered video.
 */
export function getVideoScene(videoId: string, sceneId: string): VideoScene | undefined {
  const video = getVideo(videoId);
  if (!video) return undefined;

  const target = sceneId.toLowerCase();

  // 1. Check in top-level scenes
  if (video.scenes) {
    const scene = video.scenes.find((s) => {
      const idLower = s.id.toLowerCase();
      return (
        idLower === target ||
        idLower.includes(target) ||
        idLower.endsWith(`-${target}`)
      );
    });
    if (scene) return scene;
  }

  // 2. Check inside incremental trechos
  if (video.trechos) {
    for (const trecho of video.trechos) {
      const scene = trecho.scenes.find((s) => {
        const idLower = s.id.toLowerCase();
        return (
          idLower === target ||
          idLower.includes(target) ||
          idLower.endsWith(`-${target}`)
        );
      });
      if (scene) return scene;
    }
  }

  return undefined;
}
