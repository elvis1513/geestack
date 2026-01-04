# UI Lockfile - Resources（资料中心频道页）

- **Status**: Ready for Implement
- **Date**: 2026-01-05
- **Type**: Page
- **Domain**: site
- **Routes**:
  - zh-cn: `/cn/resources`
  - en: `/en/resources`
- **Depends on**:
  - `docs/ui-lockfiles/00-foundation-layout-grid.md`
  - `docs/ui-lockfiles/00-foundation-typography.md`
  - `docs/ui-lockfiles/00-foundation-color-tokens.md`
  - `docs/ui-lockfiles/00-foundation-motion-a11y.md`
  - `docs/ui-lockfiles/10-layout-header-megamenu.md`
  - `docs/ui-lockfiles/11-layout-footer.md`

## Ready 门槛（满足才允许 Implement）
- [x] 页面 section 列表（按顺序）明确，并给出每个 section 的 padding/gap
- [x] Hero 的栅格与文本层级明确（与 typography tokens 对齐）
- [x] 资源分类结构明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：H1/H2、CTA、卡片标题、资源名称、aria-label、SEO title/description

---

## 2. Sections（按顺序列出，必填）
> 只写结构与参数，不写大段文案。文案走 i18n / content 配置。

1) Section: Hero Banner（资料中心首屏）
- layout：container内的hero
- padding-top / padding-bottom：80px / 60px
- background：渐变背景（CSS gradient）
- LCP candidate：是（Hero 标题）

2) Section: 资源分类筛选（Resource Filters）
- padding-top / padding-bottom：32px / 32px
- layout：水平标签栏
- internal gap：12px（标签间距）

3) Section: 资源列表（Resources Grid）
- padding-top / padding-bottom：48px / 64px
- internal gap：24px（卡片间距）
- grid：3列卡片网格

4) Section: 更多资源（CTA Section，可选）
- padding-top / padding-bottom：64px / 64px
- layout：居中CTA

---

## 3. Layout（必填）
- container variant（是否 override foundation）：否
- grid（每个 section 的 columns）：
  - Hero：1列（居中）
  - 资源分类：水平滚动（mobile） / 自适应（desktop）
  - 资源列表：3列（卡片网格）
- 关键卡片列表的断点行为：
  - Mobile (<768px): 1列
  - Tablet (768-1023px): 2列
  - Desktop (≥1024px): 3列

---

## 4. Typography（必填）
- Hero H1：使用 token
  - Desktop: 48px/67.2px
  - Mobile: 32px/40px
- Hero subtitle：type.body
- 资源卡片标题：type.h3（18px/25.2px）
- 资源描述：type.body-small（14px/20px）
- 资源标签：type.caption（12px/16px）
- CTA 按钮：type.button-medium

---

## 5. Color（必填）
- Hero 背景：渐变 `linear-gradient(135deg, #134e5e 0%, #71b280 100%)`
- Section 背景：统一 #FFFFFF
- 卡片背景：#FFFFFF
- 卡片边框：#E5E5E5
- 资源类型标签颜色：
  - 白皮书：#1890FF
  - 技术文档：#52C41A
  - 案例研究：#F70000
  - 视频教程：#722ED1
- CTA 主按钮：#F70000
- hover状态：#D90000

---

## 6. Interactions（必填）
- 资源分类筛选：hover时下划线 + 颜色变化，active状态加粗
- 资源卡片 hover：阴影 + 轻微位移（translateY(-4px)）
- 下载/预览按钮：hover背景色变化
- 键盘导航：Tab 顺序清晰，焦点可见

---

## 7. Assets & Performance（必填）
- 图片策略：CSS 渐变背景（稳定方案）
- 宽高比与尺寸约束（避免 CLS）：
  - 资源卡片：16:9 或 4:3
  - Hero 背景：16:9
- LCP 目标元素：Hero 标题
- lazy-loading 策略：
  - 首屏资源：不 lazy
  - 非首屏：lazy
- CLS 风险点与规避：
  - 明确卡片 width/height

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| ResourcesPage | page | N | app/site/pages/resources | 页面入口 |
| ResourcesHero | section | N | app/site/pages/resources | 资源页首屏 |
| ResourceFilters | section | Y | app/site/sections | 资源分类筛选 |
| ResourceCard | component | Y | app/site/components | 资源卡片 |
| DownloadButton | component | Y | app/site/components | 下载按钮 |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/pages/resources/index.tsx`
  - `src/main/webapp/app/site/pages/resources/ResourcesPage.tsx`
  - `src/main/webapp/app/site/pages/resources/ResourcesHero.tsx`
  - `src/main/webapp/app/site/pages/resources/resources.module.css`
  - `src/main/webapp/app/site/sections/ResourceFilters.tsx`
  - `src/main/webapp/app/site/components/ResourceCard/index.tsx`
  - `src/main/webapp/app/site/components/DownloadButton/index.tsx`
- 修改文件：
  - 路由配置：`src/main/webapp/app/site/routes/index.ts`
  - SiteEntry：`src/main/webapp/app/site/entry/SiteEntry.tsx`

---

## 10. Verification（必填）
- [ ] section 顺序与结构一致
- [ ] LCP/CLS 策略落地（首屏不抖动）
- [ ] hover/focus/active 状态齐全
- [ ] 双语一致（结构相同，文案可维护）
- [ ] 资源筛选交互正常
- [ ] 工程门槛通过（lint/prettier）

### Evidence
- 截图对比（目标站点 vs GeeStack）：
  - `.evidence/xfusion-cn-resources.png`（待补充）
  - `.evidence/xfusion-en-resources.png`（待补充）
- Lighthouse（如做过）：
  - 待实现后补充

---

## 11. 资源分类与内容（静态占位）

### 资源类型分类
- **白皮书** (Whitepapers)
  - 技术趋势分析
  - 解决方案指南
  - 行业研究报告

- **技术文档** (Technical Docs)
  - 产品手册
  - API文档
  - 部署指南

- **案例研究** (Case Studies)
  - 客户成功案例
  - 实施经验分享
  - ROI分析报告

- **视频教程** (Video Tutorials)
  - 产品演示
  - 培训课程
  - 技术讲座

### 资源卡片信息
- 标题
- 描述（1-2行）
- 资源类型标签
- 文件大小/格式
- 发布日期
- 下载/预览按钮
