/**
 * GeeStack Design System Tokens
 *
 * Centralized design tokens based on UI Lockfiles:
 * - docs/ui-lockfiles/00-foundation-layout-grid.md
 * - docs/ui-lockfiles/00-foundation-typography.md
 * - docs/ui-lockfiles/00-foundation-color-tokens.md
 * - docs/ui-lockfiles/00-foundation-motion-a11y.md
 *
 * ALL tokens must be referenced from here. NO magic numbers allowed.
 */

export * from './tokens/spacing';
export * from './tokens/breakpoints';
export * from './tokens/colors';
export * from './tokens/typography';
export * from './tokens/motion';
export * from './tokens/z-index';

export const tokens = {
  spacing: {
    container: {
      maxWidth: 1200,
      padding: { desktop: 36, mobile: 16 },
    },
    section: { desktop: 64, mobile: 40 },
    gutter: { desktop: 24, mobile: 16 },
    gap: [0, 4, 8, 12, 16, 24, 32, 48, 64, 80] as const,
  },
  breakpoints: {
    sm: 375,
    md: 768,
    lg: 1024,
    xl: 1200,
    '2xl': 1440,
  },
  grid: {
    columns: 12,
  },
  colors: {
    text: {
      DEFAULT: '#333333',
      muted: '#666666',
      light: '#999999',
      inverse: '#FFFFFF',
    },
    background: {
      DEFAULT: '#FFFFFF',
      alternate: '#F5F5F5',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    border: {
      DEFAULT: '#E0E0E0',
      light: '#F0F0F0',
    },
    cta: {
      primary: '#F70000',
      primaryHover: '#D90000',
      secondary: '#333333',
    },
    link: {
      DEFAULT: '#333333',
      hover: '#F70000',
    },
    semantic: {
      success: '#52C41A',
      warning: '#FAAD14',
      error: '#F5222D',
      info: '#1890FF',
    },
  },
  typography: {
    fontFamily: {
      zh: '"Microsoft YaHei", Arial, "PingFang SC", sans-serif',
      en: 'Arial, "Microsoft YaHei", PingFangSC, sans-serif',
    },
    fontSize: {
      h1: { desktop: 60, mobile: 30 },
      h2: { desktop: 48, mobile: 28 },
      h3: { desktop: 24, mobile: 20 },
      h4: { desktop: 20, mobile: 18 },
      body: { desktop: 14, mobile: 14 },
      small: 12,
    },
    lineHeight: {
      h1: { desktop: 1.4, mobile: 1.2 },
      h2: 1.4,
      h3: 1.5,
      body: 1.4,
      small: 1.5,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  motion: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  zIndex: {
    header: 99,
    megaMenu: 100,
    modal: 1000,
    dropdown: 101,
  },
};
