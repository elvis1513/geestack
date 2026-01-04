# UI Lockfile - Cases（案例中心频道页）

- **Status**: Ready for Implement
- **Date**: 2026-01-05
- **Type**: Page
- **Domain**: site
- **Routes**:
  - zh-cn: `/cn/cases`
  - en: `/en/cases`
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
- [x] 案例分类结构明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：H1/H2、CTA、卡片标题、案例名称、aria-label、SEO title/description

---

## 2. Sections（按顺序列出，必填）
> 只写结构与参数，不写大段文案。文案走 i18n / content 配置。

1) Section: Hero Banner（案例中心首屏）
- layout：container内的hero
- padding-top / padding-bottom：80px / 60px
- background：渐变背景（CSS gradient）
- LCP candidate：是（Hero 标题）

2) Section: 行业筛选（Industry Filters）
- padding-top / padding-bottom：32px / 32px
- layout：水平标签栏
- internal gap：12px（标签间距）

3) Section: 案例列表（Cases Grid）
- padding-top / padding-bottom：48px / 64px
- internal gap：24px（卡片间距）
- grid：3列卡片网格

4) Section: 更多案例（CTA Section，可选）
- padding-top / padding-bottom：64px / 64px
- layout：居中CTA

---

## 3. Layout（必填）
- container variant（是否 override foundation）：否
- grid（每个 section 的 columns）：
  - Hero：1列（居中）
  - 行业筛选：水平滚动（mobile） / 自适应（desktop）
  - 案例列表：3列（卡片网格）
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
- 案例卡片标题：type.h3（18px/25.2px）
- 案例描述：type.body-small（14px/20px）
- 行业标签：type.caption（12px/16px）
- CTA 按钮：type.button-medium

---

## 5. Color（必填）
- Hero 背景：渐变 `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Section 背景：统一 #FFFFFF
- 卡片背景：#FFFFFF
- 卡片边框：#E5E5E5
- 行业标签颜色：
  - 金融：#1890FF
  - 政府：#52C41A
  - 制造：#FA8C16
  - 教育：#722ED1
  - 医疗：#F70000
  - 能源：#13C2C2
- CTA 主按钮：#F70000
- hover状态：#D90000

---

## 6. Interactions（必填）
- 行业筛选：hover时下划线 + 颜色变化，active状态加粗
- 案例卡片 hover：阴影 + 轻微位移（translateY(-4px)）
- 查看详情按钮：hover背景色变化
- 键盘导航：Tab 顺序清晰，焦点可见

---

## 7. Assets & Performance（必填）
- 图片策略：CSS 渐变背景（稳定方案）
- 宽高比与尺寸约束（避免 CLS）：
  - 案例卡片：16:9
  - Hero 背景：16:9
- LCP 目标元素：Hero 标题
- lazy-loading 策略：
  - 首屏案例：不 lazy
  - 非首屏：lazy
- CLS 风险点与规避：
  - 明确卡片 width/height

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---|---|---|
| CasesPage | page | N | app/site/pages/cases | 页面入口 |
| CasesHero | section | N | app/site/pages/cases | 案例页首屏 |
| IndustryFilters | section | Y | app/site/sections | 行业筛选 |
| CaseCard | component | Y | app/site/components | 案例卡片 |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/pages/cases/index.tsx`
  - `src/main/webapp/app/site/pages/cases/CasesPage.tsx`
  - `src/main/webapp/app/site/pages/cases/CasesHero.tsx`
  - `src/main/webapp/app/site/pages/cases/cases.module.css`
  - `src/main/webapp/app/site/sections/IndustryFilters.tsx`
  - `src/main/webapp/app/site/components/CaseCard/index.tsx`
- 修改文件：
  - 路由配置：`src/main/webapp/app/site/routes/index.ts`
  - SiteEntry：`src/main/webapp/app/site/entry/SiteEntry.tsx`

---

## 10. Verification（必填）
- [ ] section 顺序与结构一致
- [ ] LCP/CLS 策略落地（首屏不抖动）
- [ ] hover/focus/active 状态齐全
- [ ] 双语一致（结构相同，文案可维护）
- [ ] 行业筛选交互正常
- [ ] 工程门槛通过（lint/prettier）

### Evidence
- 截图对比（目标站点 vs GeeStack）：
  - `.evidence/xfusion-cn-cases.png`（待补充）
  - `.evidence/xfusion-en-cases.png`（待补充）
- Lighthouse（如做过）：
  - 待实现后补充

---

## 11. 案例分类与内容（静态占位）

### 行业分类
- **金融** (Finance)
  - 银行数字化
  - 保险科技
  - 证券交易

- **政府** (Government)
  - 智慧城市
  - 电子政务
  - 公共安全

- **制造** (Manufacturing)
  - 工业4.0
  - 智能制造
  - 供应链优化

- **教育** (Education)
  - 在线教育
  - 智慧校园
  - 科研计算

- **医疗** (Healthcare)
  - 远程医疗
  - 医疗影像
  - 健康管理

- **能源** (Energy)
  - 智能电网
  - 新能源
  - 油气勘探

### 案例卡片信息
- 客户名称
- 案例标题
- 行业标签
- 案例描述（1-2行）
- 实施效果（可选）
- 查看详情按钮
