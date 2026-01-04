/**
 * Color Tokens
 * Source: docs/ui-lockfiles/00-foundation-color-tokens.md
 */

export const colors = {
  // Text colors
  text: {
    DEFAULT: '#333333', // rgb(51, 51, 51)
    muted: '#666666', // rgb(102, 102, 102)
    light: '#999999', // rgb(153, 153, 153)
    inverse: '#FFFFFF',
  },

  // Background colors
  background: {
    DEFAULT: '#FFFFFF',
    alternate: '#F5F5F5',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Border colors
  border: {
    DEFAULT: '#E0E0E0',
    light: '#F0F0F0',
  },

  // CTA colors
  cta: {
    primary: '#F70000', // xFusion red (to be replaced with GeeStack brand)
    primaryHover: '#D90000',
    secondary: '#333333',
  },

  // Link colors
  link: {
    DEFAULT: '#333333',
    hover: '#F70000',
  },

  // Semantic colors
  semantic: {
    success: '#52C41A',
    warning: '#FAAD14',
    error: '#F5222D',
    info: '#1890FF',
  },
} as const;

// Helper for opacity
export const withOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export type ColorToken = typeof colors;
