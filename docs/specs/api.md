# API Specs - GeeStack（极栈）官网

## 1. 总览与原则
- API 风格：REST
- 版本策略：
- Trace/错误码策略：

## 2. 数据域与接口清单（占位）
### 2.1 Navigation
- GET `/api/site/navigation?lang=zh-cn|en`

### 2.2 Home Sections
- GET `/api/site/home?lang=...`

### 2.3 Products & Solutions
- GET `/api/site/products?lang=...`
- GET `/api/site/products/{slug}?lang=...`

### 2.4 Resources（资料中心）
- GET `/api/site/resources?lang=...&category=...&page=...`
- GET `/api/site/resources/{slug}?lang=...`

### 2.5 Cases（案例中心）
- GET `/api/site/cases?lang=...`
- GET `/api/site/cases/{slug}?lang=...`

### 2.6 News / Events（如需要）
- GET `/api/site/news?lang=...`
- GET `/api/site/news/{slug}?lang=...`

### 2.7 Search（如需要）
- GET `/api/site/search?lang=...&q=...`

### 2.8 Contact（如需要）
- POST `/api/site/contact`

## 3. DTO/字段规范
- i18n 字段策略：
- slug 规则：
- 时间与时区规则：

## 4. 分页、排序与过滤
- page/size/sort 约定：
- filter 约定：

## 5. 缓存策略
- ETag / Cache-Control：
- CDN（如适用）：

## 6. 错误处理与可观测性
- 标准错误结构：
- traceId 返回：

## 7. 安全与限流入口
- 见 docs/specs/security.md
