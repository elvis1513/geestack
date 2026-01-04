# UI Lockfile - Home（首页 / GeeStack 复刻 xFusion）

- **Status**: Draft
- **Date**: 2026-01-04
- **Type**: Page
- **Domain**: site
- **Routes**:
  - zh-cn: `/cn`
  - en: `/en`
- **Depends on**:
  - `docs/ui-lockfiles/00-foundation-layout-grid.md`
  - `docs/ui-lockfiles/00-foundation-typography.md`
  - `docs/ui-lockfiles/00-foundation-color-tokens.md`
  - `docs/ui-lockfiles/00-foundation-motion-a11y.md`
  - `docs/ui-lockfiles/10-layout-header-megamenu.md`
  - `docs/ui-lockfiles/11-layout-footer.md`

## Ready 门槛（满足才允许 Implement）
- [ ] 首页 section 列表（按顺序）明确，并给出每个 section 的 padding/gap
- [ ] 首屏 LCP 元素明确（图片/标题/背景）并写出 CLS 规避策略
- [ ] Hero 的栅格与文本层级明确（与 typography tokens 对齐）
- [ ] 至少 1 份与目标站点对照证据（截图标注）
- [ ] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：H1/H2、CTA、卡片标题、aria-label、SEO title/description（若本页负责）

---

## 2. Sections（按顺序列出，必填）
> 只写结构与参数，不写大段文案。文案走 i18n / content 配置。

1) Section: Hero
- layout：（full-bleed / container）
- padding-top / padding-bottom：
- internal gap：
- LCP candidate：是/否（若是，写资源策略）

2) Section: ...
- padding-top / padding-bottom：
- internal gap：

（继续列出所有首页楼层）

---

## 3. Layout（必填）
- container variant（是否 override foundation）：
- grid（每个 section 的 columns）：
- 关键卡片列表（2/3/4 列）的断点行为：

---

## 4. Typography（必填）
- Hero H1：使用 token（type.h1 / override）
- Section titles：type.h2
- Cards：type.h3 / body
- CTA：是否有专用 token

---

## 5. Color（必填）
- Hero 背景（颜色/渐变/图）：
- Section 背景（交替/统一）：
- CTA 状态色（引用 foundation）：

---

## 6. Interactions（必填）
- Hero CTA hover/focus：
- 卡片 hover（阴影/边框/位移）：
- 滚动相关（如首页 header 透明→实底触发）：
- 轮播（如有）：键盘与可访问性要求

---

## 7. Assets & Performance（必填）
- 图片策略：Empty / Placeholder / Real
- 占位图来源：
- 宽高比与尺寸约束（避免 CLS）：
- LCP 目标元素：
- lazy-loading 策略：
- CLS 风险点与规避：

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| HomePage | page | N | app/site/pages/home | 页面入口 |
| HeroSection | section | Y/N | app/site/sections | 首屏楼层 |
| ... | ... | ... | ... | ... |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/pages/home/index.tsx`
  - `src/main/webapp/app/site/pages/home/sections/...`
- 修改文件：
  - 路由挂载 / site entry：
- 需要的导航/content 配置：
  - `app/site/navigation/...`（如涉及）

---

## 10. Verification（必填）
- [ ] section 顺序与结构一致（占位图不改结构）
- [ ] LCP/CLS 策略落地（首屏不抖动）
- [ ] hover/focus/active 状态齐全
- [ ] 双语一致（结构相同，文案可维护）
- [ ] 工程门槛通过（lint/test）

### Evidence
- 截图对比（目标站点 vs GeeStack）：
- Lighthouse（如做过）：

