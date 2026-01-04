# UI Lockfile - Products & Solutions（产品与解决方案频道页）

- **Status**: Ready for Implement
- **Date**: 2026-01-05
- **Type**: Page
- **Domain**: site
- **Routes**:
  - zh-cn: `/cn/products-and-solutions`
  - en: `/en/products-and-solutions`
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
- [x] 产品分类导航结构明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：H1/H2、CTA、卡片标题、产品名称、aria-label、SEO title/description

---

## 2. Sections（按顺序列出，必填）
> 只写结构与参数，不写大段文案。文案走 i18n / content 配置。

1) Section: Hero Banner（产品页首屏）
- layout：container内的hero
- padding-top / padding-bottom：80px / 60px
- background：渐变背景（CSS gradient）
- LCP candidate：是（Hero 标题）

2) Section: 产品分类导航（Product Categories）
- padding-top / padding-bottom：40px / 40px
- layout：水平标签栏
- internal gap：16px（标签间距）

3) Section: 服务器产品（Server Products）
- padding-top / padding-bottom：64px / 64px
- internal gap：24px（卡片间距）

4) Section: 存储产品（Storage Products）
- padding-top / padding-bottom：64px / 64px
- internal gap：24px（卡片间距）

5) Section: 网络产品（Network Products）
- padding-top / padding-bottom：64px / 64px
- internal gap：24px（卡片间距）

6) Section: 解决方案（Solutions）
- padding-top / padding-bottom：64px / 64px
- internal gap：24px（卡片间距）

---

## 3. Layout（必填）
- container variant（是否 override foundation）：否
- grid（每个 section 的 columns）：
  - Hero：1列（居中）
  - 产品分类：水平滚动（mobile） / 自适应（desktop）
  - 产品列表：3列（卡片网格）
  - 解决方案：3列（卡片网格）
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
- Section titles：type.h2（40px/56px）
- 产品卡片标题：type.h3（20px/28px）
- 产品描述：type.body-small（14px/20px）
- CTA 按钮：type.button-medium

---

## 5. Color（必填）
- Hero 背景：渐变 `linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)`
- Section 背景：统一 #FFFFFF
- 卡片背景：#FFFFFF
- 卡片边框：#E5E5E5
- CTA 主按钮：#F70000（与foundation一致）
- hover状态：#D90000

---

## 6. Interactions（必填）
- 产品分类导航：hover时下划线 + 颜色变化
- 产品卡片 hover：阴影 + 轻微位移（translateY(-4px)）
- CTA hover：背景色变化 + 阴影
- 滚动相关：sticky 分类导航（可选）
- 键盘导航：Tab 顺序清晰，焦点可见

---

## 7. Assets & Performance（必填）
- 图片策略：CSS 渐变背景（稳定方案）
- 宽高比与尺寸约束（避免 CLS）：
  - 产品卡片：4:3
  - Hero 背景：16:9
- LCP 目标元素：Hero 标题
- lazy-loading 策略：
  - 首屏产品：不 lazy
  - 非首屏：lazy
- CLS 风险点与规避：
  - 明确卡片 width/height

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| ProductsPage | page | N | app/site/pages/products | 页面入口 |
| ProductsHero | section | N | app/site/pages/products | 产品页首屏 |
| CategoryNav | section | Y | app/site/sections | 产品分类导航 |
| ProductCard | component | Y | app/site/components | 产品卡片 |
| SolutionCard | component | Y | app/site/components | 解决方案卡片 |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/pages/products/index.tsx`
  - `src/main/webapp/app/site/pages/products/ProductsPage.tsx`
  - `src/main/webapp/app/site/pages/products/ProductsHero.tsx`
  - `src/main/webapp/app/site/pages/products/products.module.css`
  - `src/main/webapp/app/site/sections/CategoryNav.tsx`
  - `src/main/webapp/app/site/components/ProductCard/index.tsx`
  - `src/main/webapp/app/site/components/SolutionCard/index.tsx`
- 修改文件：
  - 路由配置：`src/main/webapp/app/site/routes/index.ts`
  - 导航配置：`src/main/webapp/app/site/navigation/config/index.ts`

---

## 10. Verification（必填）
- [ ] section 顺序与结构一致
- [ ] LCP/CLS 策略落地（首屏不抖动）
- [ ] hover/focus/active 状态齐全
- [ ] 双语一致（结构相同，文案可维护）
- [ ] 产品分类导航交互正常
- [ ] 工程门槛通过（lint/prettier）

### Evidence
- 截图对比（目标站点 vs GeeStack）：
  - `.evidence/xfusion-cn-products.png`（待补充）
  - `.evidence/xfusion-en-products.png`（待补充）
- Lighthouse（如做过）：
  - 待实现后补充

---

## 11. 产品分类与内容（静态占位）

### 产品分类
- **服务器** (Servers)
  - 机架式服务器
  - 刀片服务器
  - 高性能服务器
- **存储** (Storage)
  - 全闪存存储
  - 混合存储
  - 分布式存储
- **网络** (Network)
  - 交换机
  - 路由器
  - 无线网络

### 解决方案分类
- 智算中心
- 云服务
- 边缘计算
- 数据管理
