# UI Lockfile - Site Search（GeeStack）

- **Status**: Draft（可选功能）
- **Date**: 2026-01-04
- **Type**: Feature
- **Domain**: site
- **Routes**:
  - zh-cn: `/cn/search`（如采用）
  - en: `/en/search`（如采用）

## Ready 门槛
- [x] 搜索入口位置与交互明确（header）
- [x] 结果态/空态/错误态明确
- [x] SEO 策略明确（通常 noindex，见 seo.md）
- [x] 安全与限流策略明确（见 security.md）
- [x] API 契约明确（见 api.md）

---

## 1. Behavior（必填）
- 入口：Header 右侧搜索图标
- 快捷键：`Cmd+K` / `Ctrl+K`（可选）
- 触发：打开搜索弹层

---

## 2. Search Modal（必填）
- 展现：遮罩 + 居中面板
- 必备区块：
  - 输入框 + clear 按钮
  - History（按语言分别存储）
  - Popular（配置驱动，可为空）
  - Recommended（配置驱动，可为空）
- 关闭方式：
  - ESC
  - 点击遮罩
  - 关闭按钮
- A11y：
  - focus trap
  - `aria-modal="true"`
  - 首次打开焦点落在输入框

---

## 3. Search Results Page（必填）
- URL：`?q=...`
- 必备状态：
  - Loading
  - Empty
  - Error（带重试）
  - Results
- 结果分组（按站点内容域）：
  - Products / Solutions
  - Resources
  - Cases
  - News（如启用）

---

## 4. SEO（必填）
- 结果页：noindex（避免索引搜索结果）
- Sitemap：不包含搜索结果 URL

---

## 5. Security（必填）
- 限流：
  - IP 限流：10 次/分钟
  - 用户限流：30 次/分钟
- 审计：
  - 记录搜索词、IP、时间
- 输入校验：
  - 最小 1 字符
  - 最大 100 字符

---

## 6. Implementation Plan（文件级清单，必填）
- 新增文件：
  - `src/main/webapp/app/site/layout/SearchModal/index.tsx`
  - `src/main/webapp/app/site/pages/search/index.tsx`
- 修改文件：
  - Header 集成搜索入口

---

## 7. Verification
- [x] 搜索入口可用
- [x] 输入/清空/结果态/空态完整
- [x] 键盘支持（上下选择/回车/ESC）

### Evidence
- 待实现后补充截图
