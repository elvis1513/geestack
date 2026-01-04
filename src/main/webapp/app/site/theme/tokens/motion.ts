/**
 * Motion & Animation Tokens
 * Source: docs/ui-lockfiles/00-foundation-motion-a11y.md
 */

export const motion = {
  // Duration (ms)
  duration: {
    fast: 150, // hover, 微交互
    normal: 250, // 菜单展开/收起
    slow: 350, // 页面级过渡
  },

  // Easing functions
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)', // 默认缓动
    in: 'cubic-bezier(0.4, 0, 1, 1)', // 进入缓动
    out: 'cubic-bezier(0, 0, 0.2, 1)', // 离开缓动
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // 弹性缓动
  },
} as const;

// Transition helper
export const transition = {
  fast: (property: string | string[] = 'all') =>
    Array.isArray(property)
      ? property.map(p => `${p} ${motion.duration.fast}ms ${motion.easing.standard}`).join(', ')
      : `${property} ${motion.duration.fast}ms ${motion.easing.standard}`,
  normal: (property: string | string[] = 'all') =>
    Array.isArray(property)
      ? property.map(p => `${p} ${motion.duration.normal}ms ${motion.easing.standard}`).join(', ')
      : `${property} ${motion.duration.normal}ms ${motion.easing.standard}`,
  slow: (property: string | string[] = 'all') =>
    Array.isArray(property)
      ? property.map(p => `${p} ${motion.duration.slow}ms ${motion.easing.standard}`).join(', ')
      : `${property} ${motion.duration.slow}ms ${motion.easing.standard}`,
};

export type MotionToken = typeof motion;
