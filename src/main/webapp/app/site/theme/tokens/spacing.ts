/**
 * Spacing Tokens
 * Source: docs/ui-lockfiles/00-foundation-layout-grid.md
 */

export const spacing = {
  // Container
  container: {
    maxWidth: 1200, // px
    padding: {
      desktop: 36, // px
      mobile: 16, // px
    },
  },

  // Section padding
  section: {
    desktop: 64, // px
    mobile: 40, // px
  },

  // Grid gutter
  gutter: {
    desktop: 24, // px
    mobile: 16, // px
  },

  // Gap scale (common values)
  gap: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
    '4xl': 64,
    '5xl': 80,
  },
} as const;

export type SpacingToken = typeof spacing;
