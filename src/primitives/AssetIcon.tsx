import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, staticFile, Img } from 'remotion';
import { OFurryTheme } from '../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getGlowPulse } from '../theme/motion';
import { OFurryIconName, ICON_CATALOG, getIconStaticPath } from '../theme/icons';

export interface AssetIconProps {
  name: OFurryIconName;
  size?: number;
  sizeRatio?: number;
  baseReferenceSize?: number;
  variant?: 'white' | 'orange' | 'green' | 'original' | 'custom';
  color?: string;
  glow?: boolean;
  glowColor?: string;
  showRing?: boolean;
  showGlowHalo?: boolean;
  delay?: number;
  motionPreset?: 'snappy' | 'bouncy' | 'smooth';
  ambientDrift?: boolean;
  style?: React.CSSProperties;
}

export const AssetIcon: React.FC<AssetIconProps> = ({
  name,
  size = 120,
  sizeRatio,
  baseReferenceSize = OFurryTheme.typography.sizes.hero,
  variant,
  color,
  glow = true,
  glowColor = OFurryTheme.colors.accentOrange,
  showRing = false,
  showGlowHalo = false,
  delay = 0,
  motionPreset = 'snappy',
  ambientDrift = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const meta = ICON_CATALOG[name];
  const effectiveVariant = variant || (meta ? meta.defaultVariant : 'white');

  // Proportional sizing derived from dominant typography (ADR-004 Law 8)
  const effectiveSize = sizeRatio
    ? Math.round(baseReferenceSize * sizeRatio)
    : size;

  // 1. Ambient Layer: continuous micro-drift (amplitudeRotate: 0 eliminates amateur wobble)
  const ambient = ambientDrift
    ? getAmbientDrift(frame, {
        amplitudeY: 2.2,
        amplitudeX: 1.0,
        amplitudeRotate: 0,
        periodFrames: 70,
      })
    : { translateX: 0, translateY: 0, scale: 1, rotate: 0 };

  // 2. Entrance Spring
  const selectedPreset =
    motionPreset === 'bouncy'
      ? MotionPresets.bouncy
      : motionPreset === 'smooth'
      ? MotionPresets.smooth
      : MotionPresets.snappy;

  const entryProgress = getSpringProgress(frame, fps, delay, selectedPreset);
  const scale = interpolate(entryProgress, [0, 1], [0.3, 1]);
  const opacity = interpolate(entryProgress, [0, 0.4, 1], [0, 0.95, 1]);

  // 3. Shockwave Laser Pulse Ring
  const ringProgress = interpolate(frame, [delay + 2, delay + 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.75, 1.8]);
  const ringOpacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.85, 0]);

  // Glow pulsation (anti-freeze)
  const glowPulse = getGlowPulse(frame, 50, 0.4, 0.85);

  const iconSrc = staticFile(getIconStaticPath(name));

  // Determine CSS filters based on the selected color variant
  let filterStyle: string | undefined = undefined;
  const glowFilter = glow
    ? `drop-shadow(0 0 18px ${glowColor || 'rgba(255, 153, 0, 0.65)'})`
    : '';

  switch (effectiveVariant) {
    case 'white':
      // Turn black line-art / black silhouette into crisp pure #FFFFFF
      filterStyle = `brightness(0) invert(1) ${glowFilter}`.trim();
      break;

    case 'orange':
      // Colorize into OFurry neon orange (#FF9900)
      // Filter sequence: black -> inverted/saturated -> rotated to pure vivid orange
      filterStyle =
        `brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(1987%) hue-rotate(360deg) brightness(101%) contrast(106%) ${glowFilter}`.trim();
      break;

    case 'green':
      // Colorize into OFurry neon green (#00FF00 / #00E676) inspired by RefFurry ref1.png
      filterStyle =
        `brightness(0) saturate(100%) invert(56%) sepia(93%) saturate(2132%) hue-rotate(85deg) brightness(118%) contrast(119%) drop-shadow(0 0 18px rgba(0, 255, 0, 0.75))`.trim();
      break;

    case 'original':
      // Keep natural colors (for bitcoin, gold, warning, brazil, X, crash-arrow)
      filterStyle = glow ? glowFilter : undefined;
      break;

    case 'custom':
      // Custom color via mask or filter
      break;
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: effectiveSize * 1.3,
        height: effectiveSize * 1.3,
        backgroundColor: 'transparent',
        transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
        ...style,
      }}
    >
      {/* Laser Expanding Shockwave Ring */}
      {showRing && ringProgress > 0 && ringProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            width: effectiveSize * 1.15,
            height: effectiveSize * 1.15,
            borderRadius: '50%',
            border: `2px solid ${glowColor}`,
            boxShadow: `0 0 20px ${glowColor}`,
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Ambient Glow Halo behind the icon */}
      {showGlowHalo && (
        <div
          style={{
            position: 'absolute',
            width: effectiveSize * 1.2,
            height: effectiveSize * 1.2,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${OFurryTheme.colors.accentOrangeAlpha(0.45)} 0%, transparent 70%)`,
            opacity: glowPulse * 0.5 * opacity,
            filter: 'blur(22px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Icon Graphic Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale * ambient.scale})`,
          opacity,
          width: effectiveSize,
          height: effectiveSize,
        }}
      >
        {effectiveVariant === 'custom' && color ? (
          <div
            style={{
              width: effectiveSize,
              height: effectiveSize,
              backgroundColor: color,
              WebkitMaskImage: `url(${iconSrc})`,
              maskImage: `url(${iconSrc})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              filter: glow ? glowFilter : undefined,
            }}
          />
        ) : (
          <Img
            src={iconSrc}
            style={{
              width: effectiveSize,
              height: effectiveSize,
              objectFit: 'contain',
              filter: filterStyle,
              display: 'block',
            }}
          />
        )}
      </div>
    </div>
  );
};
