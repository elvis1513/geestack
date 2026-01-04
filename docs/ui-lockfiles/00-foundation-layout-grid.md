# UI Lockfile - Foundation Layout & Grid（GeeStack）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global (applies to all site pages unless overridden)

## Ready 门槛（满足才允许 Implement）
- [x] 明确 container、breakpoints、grid、gutter、section spacing 的**数值**
- [x] 明确"允许例外"的规则（哪些页面/section 可以 override）
- [x] 明确 tokens / CSS variables 的落盘位置（与 `app/site/theme/**` 对齐）
- [x] 提供至少 1 份对照证据（目标站点截图/标注）

---

## 1. Source of Truth
- UI IA / 导航：`docs/specs/ui.md`
- 主题 tokens：`app/site/theme/**`（colors/spacing/radius/shadow/breakpoints）
- 本文件仅定义：**布局栅格与间距系统**

---

## 2. Container（必填）
- container max-width（desktop）：**1200px**（实际内容区约 1118px，左右各 36-41px padding）
- container padding-left/right（默认）：**36px**（desktop），**16px**（mobile）
- container variants（如首页首屏是否不同）：
  - default：max-width: 1200px, padding: 0 36px
  - hero：可 full-bleed（通过 negative margin 实现）

---

## 3. Breakpoints（至少 3 档，必填）
> 写清楚"断点名称 → min/max → 用途"。

- sm：**≥ 375px**（移动端，iPhone SE 级别）
- md：**≥ 768px**（平板，iPad 级别）
- lg：**≥ 1024px**（小桌面）
- xl：**≥ 1200px**（桌面，主流笔记本）
- 2xl：**≥ 1440px**（大桌面）

---

## 4. Grid System（必填）
- columns（默认）：**12 列**
- gutter（水平间距）：**24px**（desktop），**16px**（mobile）
- row gap（垂直间距，若区分）：**24px**（与 gutter 一致）
- grid variant（如某些楼层为 2/3/4 列）：
  - variant A（2 列）：6/6 分割（产品卡片）
  - variant B（3 列）：4/4/4 分割（案例卡片）
  - variant C（4 列）：3/3/3/3 分割（新闻列表）

---

## 5. Section Spacing（必填）
> 目标：统一楼层上下 padding 与常用间距阶梯。

- section padding（默认）：
  - padding-top：**64px**（desktop），**40px**（mobile）
  - padding-bottom：**64px**（desktop），**40px**（mobile）
- 常用 gap 阶梯（例如 8/12/16/24/32/48…）：
  - **4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px / 80px**
- 楼层内组件间距规范（卡片、标题、列表等）：
  - 卡片间距：24px
  - 标题与内容：16px
  - 列表项间距：12px

---

## 6. Responsive Rules（必填）
- 移动端 container 与 grid 是否降列（1 列/2 列）：
  - < 768px：降为 1 列
  - ≥ 768px：恢复多列布局
- 图文混排在不同断点的换行/顺序规则：
  - 移动端：图上文字下
  - 桌面端：左右混排
- sticky header 对内容的占位策略（避免跳动）：
  - Header 高度 80px，sticky 时占位

---

## 7. Tokens 落盘（必填）
- tokens 文件建议：
  - `app/site/theme/breakpoints.ts`
  - `app/site/theme/spacing.ts`（或 CSS vars）
- 命名规范：
  - CSS 变量：`--gs-space-1` / `--gs-space-2` ... `--gs-space-9`
  - 或 TS：`space[1]` / `space[2]` ... `space[9]`
- 禁止魔法值规则：
  - 组件中不得直接写 `px/rem` 间距（除非是 tokens 映射层）

```typescript
// app/site/theme/spacing.ts
export const space = {
  1: '4px',   // 0.25rem
  2: '8px',   // 0.5rem
  3: '12px',  // 0.75rem
  4: '16px',  // 1rem
  5: '24px',  // 1.5rem
  6: '32px',  // 2rem
  7: '48px',  // 3rem
  8: '64px',  // 4rem
  9: '80px',  // 5rem
};

// app/site/theme/breakpoints.ts
export const breakpoints = {
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1440px',
};
```

---

## 8. Overrides（允许例外的清单）
> 写"哪些页面/模块可以 override，override 只能改哪些项"。

- Header（是否允许不同 container/padding）：
  - 允许：padding 为 0（背景全宽），内容使用 container
- Home Hero（是否允许不同 max-width / full-bleed）：
  - 允许：full-bleed 背景，内容在 container 内
- 其他：
  - 特殊营销页面可申请 full-bleed section（需 ADR）

---

## 9. Evidence（证据）
- 截图/标注：
  - `.evidence/xfusion-cn-home.png`（1200px viewport）
  - `.evidence/xfusion-en-home.png`（mobile viewport）
- 备注：
  - 实测：xfusion.com 使用 1200px container，左右 padding 约 36-41px
  - Header fixed 定位，高度 80px，z-index: 99
  - Body 内容宽度约 1190px（含 padding）
