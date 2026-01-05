# SEO 验证清单 (SEO Verification Checklist)

本文档用于验证 GeeStack 网站 SEO 基线实现的正确性。

---

## 📋 手动验证清单

### 1. 后端 SEO 端点验证

#### ✅ 1.1 Sitemap.xml 验证

**URL**: `http://localhost:8080/seo/sitemap.xml`

**验证步骤**:
- [ ] 访问 `/seo/sitemap.xml` 返回 200 状态码
- [ ] Content-Type 为 `application/xml`
- [ ] XML 格式正确,无语法错误
- [ ] 包含所有 P0 页面 (home, products, resources, cases, contact)
- [ ] 中英双语页面都存在 (/cn/* 和 /en/*)
- [ ] 每个条目包含: loc, lastmod, changefreq, priority
- [ ] priority 设置合理 (home: 1.0, products: 0.9, 其他: 0.7-0.8)
- [ ] 响应头包含 Cache-Control (max-age=3600)

**验证命令**:
```bash
curl -I http://localhost:8080/seo/sitemap.xml
curl http://localhost:8080/seo/sitemap.xml | xmllint --format -
```

#### ✅ 1.2 Robots.txt 验证

**URL**: `http://localhost:8080/seo/robots.txt`

**验证步骤**:
- [ ] 访问 `/seo/robots.txt` 返回 200 状态码
- [ ] Content-Type 为 `text/plain`
- [ ] 允许所有爬虫 (`User-agent: *`)
- [ ] 禁止搜索结果页索引 (`Disallow: /cn/search`, `/en/search`)
- [ ] 包含 sitemap 位置 (`Sitemap: https://www.geestack.com/sitemap.xml`)
- [ ] 响应头包含 Cache-Control (max-age=86400)

**验证命令**:
```bash
curl -I http://localhost:8080/seo/robots.txt
curl http://localhost:8080/seo/robots.txt
```

---

### 2. 前端 Meta 标签验证

#### ✅ 2.1 首页 (Home) Meta 标签

**URL**: `http://localhost:9000/cn` (中文), `http://localhost:9000/en` (英文)

**验证步骤**:
使用 Chrome DevTools > Elements 标签检查 `<head>` 部分:

中文首页 (`/cn`):
- [ ] `<html lang="zh-CN">`
- [ ] `<title>` 包含 "极栈 GeeStack - 企业级数字化转型解决方案"
- [ ] `<meta name="description" content="...">` 存在且内容正确
- [ ] `<meta name="keywords" content="...">` 存在
- [ ] `<link rel="canonical" href="https://www.geestack.com/cn">`
- [ ] `<link rel="alternate" hreflang="zh-CN" href="...">` 存在
- [ ] `<link rel="alternate" hreflang="en" href="...">` 存在
- [ ] `<link rel="alternate" hreflang="x-default" href="...">` 存在
- [ ] `<meta property="og:title" ...>` Open Graph 标签存在
- [ ] `<meta property="og:description" ...>` 存在
- [ ] `<meta property="og:image" ...>` 存在
- [ ] `<meta property="og:url" ...>` 存在
- [ ] `<meta name="twitter:card" ...>` Twitter Card 标签存在
- [ ] `<script type="application/ld+json">` JSON-LD 结构化数据存在

英文首页 (`/en`):
- [ ] `<html lang="en">`
- [ ] `<title>` 包含 "GeeStack - Enterprise Digital Transformation Solutions"
- [ ] 所有其他 meta 标签内容为英文版本

**验证方法**:
```javascript
// 在浏览器 Console 中执行:
document.title
document.querySelector('meta[name="description"]').content
document.querySelector('link[rel="canonical"]').href
document.querySelectorAll('link[rel="alternate"][hreflang]').length
```

#### ✅ 2.2 其他页面 Meta 标签

**测试页面**:
- `/cn/products-and-solutions` 和 `/en/products-and-solutions`
- `/cn/resources` 和 `/en/resources`
- `/cn/cases` 和 `/en/cases`
- `/cn/contact` 和 `/en/contact`

**验证步骤**:
- [ ] 每个页面有唯一的 title 和 description
- [ ] Canonical URL 正确反映当前路径
- [ ] Hreflang 标签正确指向双语版本
- [ ] Open Graph 标签内容正确

#### ✅ 2.3 特殊页面 Meta 标签

**搜索结果页** (`/cn/search`, `/en/search`):
- [ ] `<meta name="robots" content="noindex, nofollow">` 存在

**404 页面** (`/cn/not-found`, `/en/not-found`):
- [ ] `<meta name="robots" content="noindex, nofollow">` 存在

---

### 3. 动态行为验证

#### ✅ 3.1 语言切换验证

**验证步骤**:
1. 访问 `/cn` 首页
2. 使用浏览器 DevTools 查看 `<title>` 和 meta 标签
3. 点击语言切换按钮切换到英文
4. 验证所有 meta 标签已更新为英文版本

**预期结果**:
- [ ] title 从中文变为英文
- [ ] description 从中文变为英文
- [ ] html lang 属性从 `zh-CN` 变为 `en`
- [ ] Canonical URL 从 `/cn` 变为 `/en`
- [ ] Hreflang 标签正确更新

#### ✅ 3.2 路由切换验证

**验证步骤**:
1. 在浏览器中导航不同页面
2. 使用 DevTools 验证每个页面的 meta 标签

**预期结果**:
- [ ] 每个页面加载时 meta 标签动态更新
- [ ] 页面 title 反映当前页面内容
- [ ] Canonical URL 反映当前路径

---

### 4. JSON-LD 结构化数据验证

#### ✅ 4.1 结构化数据格式验证

**验证步骤**:
1. 在浏览器中打开任意页面
2. 在 Console 中执行:
   ```javascript
   JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)
   ```

**预期结果**:
- [ ] JSON 格式有效,可正确解析
- [ ] 包含 `@context: "https://schema.org"`
- [ ] 包含 Organization schema (name, url, logo, description)
- [ ] 包含 WebSite schema (含 SearchAction)

#### ✅ 4.2 Google Rich Results Test

**验证步骤**:
1. 访问 [Google Rich Results Test](https://search.google.com/test/rich-results)
2. 输入网站 URL (或使用代码片段功能)
3. 验证结构化数据被识别

**注意**: 由于 localhost 无法被 Google 访问,此测试需要在部署到生产环境后进行。

---

### 5. Lighthouse SEO 审计

#### ✅ 5.1 运行 Lighthouse

**验证步骤**:
1. 在 Chrome 中打开任意页面
2. 打开 DevTools > Lighthouse 标签
3. 选择 "SEO" 类别
4. 运行审计

**预期结果**:
- [ ] SEO 分数 ≥ 90
- [ ] 无 "meta description" 警告
- [ ] 无 "hreflang" 警告
- [ ] 无 "canonical" 警告
- [ ] 无 "link text" 警告
- [ ] 结构化数据被识别

**常见问题**:
- 如果分数低于 90,检查:
  - 所有页面是否有 description
  - Canonical URL 是否正确
  - Hreflang 标签是否有效
  - 是否有可访问性问题

---

## 🔧 自动化测试命令

### 批量验证脚本

```bash
#!/bin/bash
# SEO 验证脚本

BASE_URL="http://localhost:8080"
FRONTEND_URL="http://localhost:9000"

echo "=== 后端 SEO 端点验证 ==="

# 1. Sitemap.xml
echo "1. 验证 sitemap.xml..."
curl -s -o /dev/null -w "sitemap.xml: %{http_code}\n" "$BASE_URL/seo/sitemap.xml"
curl -s "$BASE_URL/seo/sitemap.xml" | head -20

# 2. Robots.txt
echo -e "\n2. 验证 robots.txt..."
curl -s -o /dev/null -w "robots.txt: %{http_code}\n" "$BASE_URL/seo/robots.txt"
curl -s "$BASE_URL/seo/robots.txt"

echo -e "\n=== 前端页面验证 ==="

# 3. 检查各页面状态码
PAGES=(
  "/cn"
  "/en"
  "/cn/products-and-solutions"
  "/en/products-and-solutions"
  "/cn/resources"
  "/en/resources"
  "/cn/cases"
  "/en/cases"
  "/cn/contact"
  "/en/contact"
)

for page in "${PAGES[@]}"; do
  curl -s -o /dev/null -w "$page: %{http_code}\n" "$FRONTEND_URL$page"
done

echo -e "\n验证完成!"
```

---

## 📊 验收标准

### 功能验收

- [ ] 所有后端 SEO 端点可访问 (200 状态码)
- [ ] Sitemap.xml 格式正确,包含所有页面
- [ ] Robots.txt 正确配置
- [ ] 所有页面有唯一的 title 和 description
- [ ] Canonical URL 正确
- [ ] Hreflang 标签存在且正确 (zh-CN, en, x-default)
- [ ] Open Graph 标签存在
- [ ] JSON-LD 结构化数据存在且格式正确

### 技术验收

- [ ] ESLint/Prettier 通过
- [ ] TypeScript 编译无错误
- [ ] 前端 webpack 编译成功
- [ ] 后端 Maven 编译成功

### SEO 验收

- [ ] Lighthouse SEO 分数 ≥ 90
- [ ] 无 Google Search Console SEO 错误
- [ ] Meta 标签在语言/路由切换时正确更新
- [ ] 搜索结果页和 404 页面有 noindex

---

## 📝 已知限制

### Phase 1 限制 (当前实现)

1. **SPA SEO 局限**
   - 搜索引擎需要执行 JavaScript 才能读取 meta 标签
   - 部分爬虫可能无法正确索引动态内容
   - 社交媒体爬虫(如 Facebook, Twitter)可以执行 JS,应能正确读取 OG 标签

2. **静态内容**
   - Sitemap 目前是硬编码的页面列表
   - 未来需要从数据库动态生成

### Phase 2 改进计划

1. **预渲染/SSR**
   - 考虑使用 prerender.io 或 Rendertron
   - 或迁移到 Next.js 进行 SSR

2. **动态 Sitemap**
   - 从 CMS/数据库读取页面列表
   - 自动包含产品详情、新闻等动态内容

3. **高级结构化数据**
   - Product schema
   - Article schema
   - BreadcrumbList schema

---

## 🔗 相关文档

- [实现计划](/Users/elvis/.claude/plans/cached-wishing-toucan.md)
- [架构决策记录 (ADR)](/Users/elvis/Product/geestack/docs/adr/)
- [SEO 配置](/Users/elvis/Product/geestack/src/main/webapp/app/site/seo/)
- [后端 SEO 服务](/Users/elvis/Product/geestack/src/main/java/com/geestack/www/service/SEOService.java)

---

**最后更新**: 2026-01-05
**版本**: 1.0.0
**状态**: Phase 1 实现完成
