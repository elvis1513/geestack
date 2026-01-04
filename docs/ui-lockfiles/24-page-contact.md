# UI Lockfile - Contact（联系我们/如何购买）

- **Status**: Ready for Implement
- **Date**: 2026-01-05
- **Type**: Page
- **Domain**: site
- **Routes**:
  - zh-cn: `/cn/contact`
  - en: `/en/contact`
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
- [x] 联系方式结构明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：H1/H2、CTA、标题、aria-label、SEO title/description

---

## 2. Sections（按顺序列出，必填）

1) Section: Hero Banner（联系首屏）
- layout：container内的hero
- padding-top / padding-bottom：80px / 60px
- background：渐变背景（CSS gradient）
- LCP candidate：是（Hero 标题）

2) Section: 联系方式卡片（Contact Cards）
- padding-top / padding-bottom：64px / 64px
- layout：3列卡片网格
- internal gap：24px（卡片间距）
- 内容：销售热线 / 邮箱 / 办公地址

3) Section: 联系表单（Contact Form）
- padding-top / padding-bottom：64px / 64px
- layout：居中表单，最大宽度600px
- 表单字段：姓名 / 邮箱 / 电话 / 公司 / 留言

---

## 3. Layout（必填）
- container variant（是否 override foundation）：否
- grid（每个 section 的 columns）：
  - Hero：1列（居中）
  - 联系方式：3列（卡片网格）
  - 联系表单：1列（居中）
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
- 卡片标题：type.h3（18px/25.2px）
- 表单标签：type.body-small（14px/20px）
- 表单输入：type.body（16px/24px）
- CTA 按钮：type.button-medium

---

## 5. Color（必填）
- Hero 背景：渐变 `linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`
- Section 背景：统一 #FFFFFF
- 卡片背景：#FFFFFF
- 卡片边框：#E5E5E5
- 卡片图标：#F70000
- 表单边框：#E5E5E5
- 表单焦点：#1890FF
- CTA 主按钮：#F70000
- hover状态：#D90000

---

## 6. Interactions（必填）
- 联系方式卡片 hover：阴影 + 轻微位移
- 表单输入框 focus：边框颜色变化 + 阴影
- 提交按钮 hover：背景色变化
- 表单验证：错误提示显示
- 键盘导航：Tab 顺序清晰，焦点可见

---

## 7. Assets & Performance（必填）
- 图片策略：CSS 渐变背景（稳定方案）
- LCP 目标元素：Hero 标题
- CLS 风险点与规避：
  - 明确卡片 width/height
  - 表单字段固定高度

---

## 8. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---|---|---|
| ContactPage | page | N | app/site/pages/contact | 页面入口 |
| ContactHero | section | N | app/site/pages/contact | 联系页首屏 |
| ContactCard | component | Y | app/site/components | 联系方式卡片 |
| ContactForm | section | Y | app/site/sections | 联系表单 |

---

## 9. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/pages/contact/index.tsx`
  - `src/main/webapp/app/site/pages/contact/ContactPage.tsx`
  - `src/main/webapp/app/site/pages/contact/ContactHero.tsx`
  - `src/main/webapp/app/site/pages/contact/contact.module.css`
  - `src/main/webapp/app/site/sections/ContactForm.tsx`
  - `src/main/webapp/app/site/components/ContactCard/index.tsx`
- 修改文件：
  - 路由配置：`src/main/webapp/app/site/routes/index.ts`
  - SiteEntry：`src/main/webapp/app/site/entry/SiteEntry.tsx`

---

## 10. Verification（必填）
- [ ] section 顺序与结构一致
- [ ] LCP/CLS 策略落地（首屏不抖动）
- [ ] hover/focus/active 状态齐全
- [ ] 双语一致（结构相同，文案可维护）
- [ ] 表单验证正常
- [ ] 工程门槛通过（lint/prettier）

### Evidence
- 截图对比（目标站点 vs GeeStack）：
  - `.evidence/xfusion-cn-contact.png`（待补充）
  - `.evidence/xfusion-en-contact.png`（待补充）
- Lighthouse（如做过）：
  - 待实现后补充

---

## 11. 联系方式内容（静态占位）

### 联系方式分类
- **销售热线** (Sales Hotline)
  - 400-888-8888
  - Mon-Fri 9:00-18:00

- **技术支持** (Technical Support)
  - support@geestack.com
  - 7x24小时服务

- **商务合作** (Business Inquiry)
  - business@geestack.com
  - 商务洽谈

### 表单字段
- 姓名 / Name
- 邮箱 / Email
- 电话 / Phone
- 公司 / Company
- 留言 / Message
