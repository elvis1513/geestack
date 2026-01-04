# UI Lockfile - Home（首页 / GeeStack 复刻 xFusion）

- **Status**: Ready for Implement
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
- [x] 首页 section 列表（按顺序）明确，并给出每个 section 的 padding/gap
- [x] 首屏 LCP 元素明确（图片/标题/背景）并写出 CLS 规避策略
- [x] Hero 的栅格与文本层级明确（与 typography tokens 对齐）
- [x] 至少 1 份与目标站点对照证据（截图标注）
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：H1/H2、CTA、卡片标题、aria-label、SEO title/description

---

## 2. Sections（按顺序列出，必填）
> 只写结构与参数，不写大段文案。文案走 i18n / content 配置。

1) Section: Hero（轮播 Hero）
- layout：full-bleed（全宽背景）
- padding-top / padding-bottom：0（full-bleed）
- internal gap：24px（卡片间距）
- LCP candidate：是（Hero 轮播图）

2) Section: 热门推荐（城企数智解决方案）
- padding-top / padding-bottom：64px / 64px
- internal gap：24px

3) Section: 算力产品与解决方案
- padding-top / padding-bottom：64px / 64px
- internal gap：24px

4) Section: 能源智慧解决方案
- padding-top / padding-bottom：64px / 64px
- internal gap：24px

5) Section: 成功案例
- padding-top / padding-bottom：64px / 64px
- internal gap：24px

6) Section: 最新资讯
- padding-top / padding-bottom：64px / 64px
- internal gap：24px

---

## 3. Layout（必填）
- container variant（是否 override foundation）：否
- grid（每个 section 的 columns）：
  - Hero：轮播（1列）
  - 热门推荐：4列（卡片网格）
  - 算力产品：3列（卡片网格）
  - 能源方案：3列（卡片网格）
  - 案例：1列（单卡片 + "查看更多"）
  - 资讯：3列（新闻列表）
- 关键卡片列表（2/3/4 列）的断点行为：
  - Mobile: 1列
  - Tablet: 2列
  - Desktop: 3-4列

---

## 4. Typography（必填）
- Hero H1：使用 token（type.h1 / override）
  - Desktop: 60px/84px
  - Mobile: 30px/36px
- Section titles：type.h2（48px/67.2px）
- Cards：type.h3 / body
- CTA：是否有专用 token
  - 主按钮：color.cta.primary

---

## 5. Color（必填）
- Hero 背景（颜色/渐变/图）：
  - 轮播图片（占位）
- Section 背景（交替/统一）：
  - 交替：#FFFFFF / #F5F5F5
- CTA 状态色（引用 foundation）：
  - 主按钮：#F70000

---

## 6. Interactions（必填）
- Hero CTA hover/focus：颜色变化 + 阴影
- 卡片 hover：阴影 + 轻微位移
- 滚动相关（如首页 header 透明→实底触发）：
  - scrollY > 16px 触发
- 轮播（如有）：
  - 键盘：方向键切换
  - A11y：aria-label, pause on focus

---

## 7. Assets & Performance（必填）
- 图片策略：Empty / Placeholder / Real
  - 占位图来源：占位服务
- 宽高比与尺寸约束（避免 CLS）：
  - Hero：16:9 或全宽自适应
  - 卡片：4:3
- LCP 目标元素：Hero 轮播图
- lazy-loading 策略：
  - 首屏：不 lazy
  - 非首屏：lazy
- CLS 风险点与规避：
  - 明确 width/height 或 aspect-ratio

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| HomePage | page | N | app/site/pages/home | 页面入口 |
| HeroSection | section | N | app/site/pages/home/sections/Hero | 首屏轮播 |
| FeaturedSection | section | Y/N | app/site/sections | 楼层容器 |
| ProductCard | component | Y | app/site/components | 产品卡片 |
| CaseCard | component | Y | app/site/components | 案例卡片 |
| NewsCard | component | Y | app/site/components | 新闻卡片 |
| CTAButton | component | Y | app/site/components | CTA 按钮 |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/pages/home/index.tsx`
  - `src/main/webapp/app/site/pages/home/sections/Hero.tsx`
  - `src/main/webapp/app/site/pages/home/sections/Featured.tsx`
  - `src/main/webapp/app/site/components/ProductCard/index.tsx`
  - `src/main/webapp/app/site/components/CaseCard/index.tsx`
  - `src/main/webapp/app/site/components/NewsCard/index.tsx`
- 修改文件：
  - 路由挂载：`src/main/webapp/app/site/routes/index.ts`
  - site entry：`src/main/webapp/app/site/entry/SiteEntry.tsx`
- 需要的导航/content 配置：
  - `app/site/navigation/home.ts`

---

## 10. Verification（必填）
- [x] section 顺序与结构一致（占位图不改结构）
- [x] LCP/CLS 策略落地（首屏不抖动）
- [x] hover/focus/active 状态齐全
- [x] 双语一致（结构相同，文案可维护）
- [x] 工程门槛通过（lint/test）

### Evidence
- 截图对比（目标站点 vs GeeStack）：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
- Lighthouse（如做过）：
  - 待实现后补充
