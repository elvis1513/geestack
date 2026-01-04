/**
 * Z-Index Tokens
 * Source: docs/ui-lockfiles/00-foundation-motion-a11y.md
 */

export const zIndex = {
  header: 99,
  megaMenu: 100,
  dropdown: 101,
  modal: 1000,
  toast: 1100,
} as const;

export type ZIndexToken = typeof zIndex;
