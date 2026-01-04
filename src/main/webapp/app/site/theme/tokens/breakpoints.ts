/**
 * Breakpoint Tokens
 * Source: docs/ui-lockfiles/00-foundation-layout-grid.md
 */

export const breakpoints = {
  sm: 375, // Mobile
  md: 768, // Tablet
  lg: 1024, // Desktop
  xl: 1200, // Large Desktop
  '2xl': 1440, // Extra Large
} as const;

// Media query helpers
export const media = {
  up: (bp: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[bp]}px)`,
  down: (bp: keyof typeof breakpoints) => `@media (max-width: ${breakpoints[bp] - 1}px)`,
  between: (min: keyof typeof breakpoints, max: keyof typeof breakpoints) =>
    `@media (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`,
  only(bp: keyof typeof breakpoints) {
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;
    const index = keys.indexOf(bp);
    if (index === keys.length - 1) {
      return media.up(bp);
    }
    return media.between(bp, keys[index + 1]);
  },
};

export type BreakpointToken = typeof breakpoints;
