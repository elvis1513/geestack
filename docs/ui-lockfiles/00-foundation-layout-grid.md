# UI Lockfile - Foundation Layout & Grid（GeeStack）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Foundation
- **Domain**: site
- **Scope**: Global (applies to all site pages unless overridden)

## Ready 门槛（满足才允许 Implement）
- [ ] 明确 container、breakpoints、grid、gutter、section spacing 的**数值**
- [ ] 明确“允许例外”的规则（哪些页面/section 可以 override）
- [ ] 明确 tokens / CSS variables 的落盘位置（与 `app/site/theme/**` 对齐）
- [ ] 提供至少 1 份对照证据（目标站点截图/标注）

---

## 1. Source of Truth
- UI IA / 导航：`docs/specs/ui.md`
- 主题 tokens：`app/site/theme/**`（colors/spacing/radius/shadow/breakpoints）
- 本文件仅定义：**布局栅格与间距系统**

---

## 2. Container（必填）
- container max-width（desktop）：
- container padding-left/right（默认）：
- container variants（如首页首屏是否不同）：
  - default：
  - hero：

---

## 3. Breakpoints（至少 3 档，必填）
> 写清楚“断点名称 → min/max → 用途”。

- sm：
- md：
- lg/xl：

---

## 4. Grid System（必填）
- columns（默认）：
- gutter（水平间距）：
- row gap（垂直间距，若区分）：
- grid variant（如某些楼层为 2/3/4 列）：
  - variant A：
  - variant B：

---

## 5. Section Spacing（必填）
> 目标：统一楼层上下 padding 与常用间距阶梯。

- section padding（默认）：
  - padding-top：
  - padding-bottom：
- 常用 gap 阶梯（例如 8/12/16/24/32/48…）：
- 楼层内组件间距规范（卡片、标题、列表等）：

---

## 6. Responsive Rules（必填）
- 移动端 container 与 grid 是否降列（1 列/2 列）：
- 图文混排在不同断点的换行/顺序规则：
- sticky header 对内容的占位策略（避免跳动）：

---

## 7. Tokens 落盘（必填）
- tokens 文件建议：
  - `app/site/theme/breakpoints.ts`
  - `app/site/theme/spacing.ts`（或 CSS vars）
- 命名规范：
  - `--gs-space-1` / `--gs-space-2` 或 `space.1` / `space.2`
- 禁止魔法值规则：
  - 组件中不得直接写 `px/rem` 间距（除非是 tokens 映射层）

---

## 8. Overrides（允许例外的清单）
> 写“哪些页面/模块可以 override，override 只能改哪些项”。

- Header（是否允许不同 container/padding）：
- Home Hero（是否允许不同 max-width / full-bleed）：
- 其他：

---

## 9. Evidence（证据）
- 截图/标注：
- 备注：

