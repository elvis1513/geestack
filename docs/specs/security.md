# Security Specs - GeeStack（极栈）官网

## 1. 威胁模型（面向公网）
- 风险：XSS/注入/爬虫/表单滥用/点击劫持/资源盗链
- 风险等级划分：

## 2. Web 安全基线（必须）
- CSP：
- HSTS：
- X-Frame-Options / frame-ancestors：
- X-Content-Type-Options：
- Referrer-Policy：
- Cookie 策略（SameSite/HttpOnly/Secure）：

## 3. XSS/CSRF 防护策略
- 输入校验：
- 输出编码：
- CSRF（如有表单）：

## 4. 表单与反垃圾（如需要）
- Contact/Subscribe：
- 验证码策略：
- 频率限制：
- 审计：

## 5. 依赖与供应链安全
- npm/maven 漏洞扫描策略：
- 升级策略：

## 6. 日志与隐私（PII）
- 脱敏：
- 保留周期：
- 访问控制：

## 7. Console/后台预留（未来）
- RBAC：
- JWT：
- 审计：
