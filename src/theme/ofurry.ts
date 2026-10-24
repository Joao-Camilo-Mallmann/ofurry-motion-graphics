/**
 * OFurry Brand Theme & Layout Design Tokens
 * 
 * Identity: Tech Infographic / High Impact Minimalist Motion Graphics
 * Palette: Solid Black (#000000) / Transparent + Pure White (#FFFFFF) + Neon Orange/Yellow (#FF9900 / #FFB800)
 * Typography: Multi-Family System (Archivo Black, Bebas Neue, Syne, Space Grotesk, Plus Jakarta Sans, Montserrat)
 */

export const OFurryTheme = {
  colors: {
    background: '#000000',
    backgroundTransparent: 'transparent',
    surface: '#0B0B0B',
    surfaceElevated: '#141414',
    border: '#242424',
    borderLight: '#383838',

    // Text & Line art
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
    muted: '#5A5A5A',

    // High-Contrast Solid Highlight Block (Anti-"Cara de IA")
    highlightSolid: '#FF9900',
    highlightText: '#000000',

    // Accents
    accentOrange: '#FF9900',
    accentYellow: '#FFB800',
    accentOrangeBright: '#FFAE33',
    accentAmber: '#FF7700',

    // Status accents
    success: '#00E676',
    danger: '#FF334B',
    info: '#00B0FF',

    // Alpha / Glow channels
    accentOrangeAlpha: (opacity: number) => `rgba(255, 153, 0, ${opacity})`,
    accentYellowAlpha: (opacity: number) => `rgba(255, 184, 0, ${opacity})`,
    whiteAlpha: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
    blackAlpha: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
  },

  typography: {
    // Legacy fallback
    fontFamily: `'Plus Jakarta Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    
    // Multi-Family Specialized Motion System
    families: {
      hero: `'Archivo Black', sans-serif`,
      condensed: `'Bebas Neue', sans-serif`,
      conceptual: `'Syne', sans-serif`,
      tech: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'SF Mono', monospace, sans-serif`,
      mono: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'SF Mono', monospace, sans-serif`,
      body: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
      montserrat: `'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif`,
      display: `'Archivo Black', sans-serif`,
    },

    weights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },

    // Monumental Editorial Scales (Anti-Mini-Widgets)
    sizes: {
      hero: 140, // 130-160px
      title: 80,
      subtitle: 40,
      body: 26,
      caption: 18,
      badge: 16,
      microLabel: 14, // Swiss high-contrast tabular label
      numberHero: 220, // 200-240px
      numberCard: 110,
      numberBadge: 64,
    },

    letterSpacing: {
      tight: '-0.04em',
      snug: '-0.02em',
      normal: '0em',
      wide: '0.04em',
      wider: '0.08em',
      widest: '0.18em',
    },

    lineHeights: {
      none: 0.95,
      tight: 1.05,
      standard: 1.25,
      relaxed: 1.4,
    },
  },

  layout: {
    width: 1920,
    height: 1080,
    fps: 30,
    aspectRatio: '16:9',
    safeArea: {
      top: 80,
      bottom: 80,
      left: 120,
      right: 120,
    },
    resolution4k: {
      width: 3840,
      height: 2160,
    },
  },

  effects: {
    glowOrange: '0 0 24px rgba(255, 153, 0, 0.45)',
    glowOrangeStrong: '0 0 40px rgba(255, 153, 0, 0.75), 0 0 15px rgba(255, 153, 0, 0.9)',
    glowYellow: '0 0 24px rgba(255, 184, 0, 0.45)',
    glowWhite: '0 0 20px rgba(255, 255, 255, 0.25)',
    cardShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 0 1px #242424',
    cardGlow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 153, 0, 0.4), 0 0 20px rgba(255, 153, 0, 0.15)',
    solidBadgeShadow: '0 4px 20px rgba(255, 153, 0, 0.5)',
  },
} as const;

export type ThemeType = typeof OFurryTheme;
