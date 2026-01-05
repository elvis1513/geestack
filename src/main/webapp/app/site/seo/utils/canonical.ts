/**
 * Canonical URL utilities
 * Generates canonical URLs for SEO
 */

import { Locale } from '../../navigation/config';

// BASE_URL 在后端 application.yml 配置
// 前端使用默认值即可,无需运行时环境变量
const BASE_URL = 'https://www.geestack.com';

/**
 * Get canonical URL for a given path and locale
 */
export function getCanonicalUrl(path: string, locale: Locale): string {
  // Ensure path starts with locale prefix
  const localePrefix = locale === 'zh-cn' ? '/cn' : '/en';

  // Remove trailing slash for consistency
  const cleanPath = path.replace(/\/$/, '');

  // If path already has locale prefix, use it; otherwise add it
  const fullPath =
    cleanPath.startsWith('/cn') || cleanPath.startsWith('/en') ? cleanPath : `${localePrefix}${cleanPath === '' ? '' : cleanPath}`;

  return `${BASE_URL}${fullPath}`;
}

/**
 * Get alternate language URL for hreflang
 */
export function getAlternateUrl(path: string, currentLocale: Locale): string {
  const localePrefix = currentLocale === 'zh-cn' ? '/cn' : '/en';
  const altPrefix = currentLocale === 'zh-cn' ? '/en' : '/cn';

  const cleanPath = path.replace(/\/$/, '');
  const altPath = cleanPath.replace(localePrefix, altPrefix);

  return `${BASE_URL}${altPath}`;
}
