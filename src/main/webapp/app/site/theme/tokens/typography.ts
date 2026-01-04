/**
 * Typography Tokens
 * Source: docs/ui-lockfiles/00-foundation-typography.md
 */

export const typography = {
  // Font families
  fontFamily: {
    zh: '"Microsoft YaHei", Arial, "PingFang SC", sans-serif',
    en: 'Arial, "Microsoft YaHei", PingFangSC, sans-serif',
  },

  // Font sizes (px)
  fontSize: {
    h1: {
      desktop: 60,
      mobile: 30,
    },
    h2: {
      desktop: 48,
      mobile: 28,
    },
    h3: {
      desktop: 24,
      mobile: 20,
    },
    h4: {
      desktop: 20,
      mobile: 18,
    },
    body: {
      desktop: 14,
      mobile: 14,
    },
    small: 12,
  },

  // Line heights
  lineHeight: {
    h1: {
      desktop: 1.4, // 84px / 60px
      mobile: 1.2, // 36px / 30px
    },
    h2: 1.4, // 67.2px / 48px
    h3: 1.5, // 36px / 24px
    body: 1.4, // 19.6px / 14px
    small: 1.5, // 18px / 12px
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
} as const;

// Type scale helper
export const typeScale = {
  h1: {
    fontSize: typography.fontSize.h1,
    lineHeight: typography.lineHeight.h1,
    fontWeight: typography.fontWeight.bold,
  },
  h2: {
    fontSize: typography.fontSize.h2,
    lineHeight: typography.lineHeight.h2,
    fontWeight: typography.fontWeight.bold,
  },
  h3: {
    fontSize: typography.fontSize.h3,
    lineHeight: typography.lineHeight.h3,
    fontWeight: typography.fontWeight.bold,
  },
  h4: {
    fontSize: typography.fontSize.h4,
    lineHeight: typography.lineHeight.h3,
    fontWeight: typography.fontWeight.bold,
  },
  body: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.lineHeight.body,
    fontWeight: typography.fontWeight.normal,
  },
  small: {
    fontSize: typography.fontSize.small,
    lineHeight: typography.lineHeight.small,
    fontWeight: typography.fontWeight.normal,
  },
} as const;

export type TypographyToken = typeof typography;
