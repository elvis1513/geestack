# UI Lockfile - Footer（GeeStack / 复刻 xFusion）

- **Status**: Ready for Implement
- **Date**: 2026-01-04
- **Type**: Layout
- **Domain**: site
- **Routes**: Global
- **Depends on**:
  - `docs/ui-lockfiles/00-foundation-layout-grid.md`
  - `docs/ui-lockfiles/00-foundation-typography.md`
  - `docs/ui-lockfiles/00-foundation-color-tokens.md`

## Ready 门槛（满足才允许 Implement）
- [x] footer 栏目结构（列数/分组/链接类型）明确
- [x] 版权/备案/法律信息区块明确
- [x] 移动端折叠策略明确
- [x] tokens/spacing/typography 明确
- [x] Implementation Plan 文件级清单完成

---

## 1. Branding 替换（强制）
- 中文替换：`超聚变` → `极栈`
- 英文替换：`xFusion` → `GeeStack`
- 覆盖范围：公司名、链接文本、aria-label

---

## 2. Structure（必填）
- 上半区（栏目链接区）：
  - 列 1：关于极栈
    - 公司简介
    - 质量管理
    - 合规诚信
    - 招贤纳士
    - 联系我们
  - 列 2：新闻与活动
    - 新闻公告
    - 市场活动
  - 列 3：产品与解决方案
    - 产品
    - 生态创新及服务
  - 列 4：合作伙伴
    - 成为合作伙伴
    - 伙伴政策
    - 伙伴支持
  - 列 5：资源中心
    - 资料中心
    - 案例中心
    - 多媒体中心
  - （如有）社交媒体/二维码/订阅入口：
    - 订阅接收最新资讯
    - 关注我们（微博/头条/B站/Twitter/Facebook/LinkedIn/YouTube）
- 下半区（legal/info）：
  - Logo + 订阅 + 社媒图标
  - 版权
  - 备案（豫ICP备2021029399号 → 需更新）
  - 隐私/条款/除名查询链接

---

## 3. Layout & Responsive（必填）
- desktop columns：**5 列**（栏目链接）
- mobile：
  - 是否折叠（accordion）：是，首列展开，其他折叠
  - 折叠交互与 A11y（aria-expanded）：是
- padding-top/bottom：**64px**（desktop），**40px**（mobile）
- 分割线与间距：
  - 栏目间距：24px（gutter）
  - 链接间距：0 0 20px

---

## 4. Typography（必填）
- 栏目标题字级：14px / 700
- 链接字级：14px / 400
- legal 文本字级：12px / 400
- 颜色：
  - 栏目标题：#333333
  - 链接：#999999
  - legal：#999999

---

## 5. Color（必填）
- background：#FFFFFF
- text/link：#999999
- hover/active：#333333
- divider：#E0E0E0（栏目间可选）

---

## 6. Component Inventory（必填）
| Component | Type | Reusable? | Directory Target | Responsibility |
|---|---|---:|---|---|
| Footer | layout | Y | app/site/layout/Footer | 页脚容器 |
| FooterColumn | component | Y | app/site/layout/FooterColumn | 栏目列 |
| FooterLink | component | Y | app/site/components/FooterLink | 链接渲染 |
| SocialLinks | component | Y | app/site/components/SocialLinks | 社媒图标 |

---

## 7. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/layout/Footer/index.tsx`
  - `src/main/webapp/app/site/layout/Footer/FooterColumn.tsx`
  - `src/main/webapp/app/site/components/FooterLink/index.tsx`
  - `src/main/webapp/app/site/components/SocialLinks/index.tsx`
- 修改文件：
  - `src/main/webapp/app/site/entry/SiteEntry.tsx`（添加 Footer）
- 依赖导航配置：
  - `app/site/navigation/footer.ts`

---

## 8. Verification（必填）
- [x] 栏目结构与目标站点一致（含移动端策略）
- [x] 链接 hover/focus 可见
- [x] 双语一致（结构相同、文案正确）
- [x] A11y：折叠/链接可达

### Evidence
- 截图（desktop/mobile）：
  - `.evidence/xfusion-cn-home.png`
  - `.evidence/xfusion-en-home.png`
