/**
 * JSON-LD structured data generators
 * Creates structured data for search engines
 */

import { Locale } from '../../navigation/config';

// BASE_URL 在后端 application.yml 配置
// 前端使用默认值即可,无需运行时环境变量
const BASE_URL = 'https://www.geestack.com';

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(locale: Locale) {
  const isZh = locale === 'zh-cn';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isZh ? '极栈' : 'GeeStack',
    alternateName: isZh ? 'GeeStack' : '极栈',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: isZh
      ? '极栈(GeeStack)提供企业级数字化转型解决方案'
      : 'GeeStack provides enterprise-grade digital transformation solutions',
    sameAs: [
      // Add social media URLs when available
      // 'https://www.linkedin.com/company/geestack',
      // 'https://twitter.com/geestack',
    ],
  };
}

/**
 * Generate WebSite structured data with search action
 */
export function generateWebSiteSchema(locale: Locale) {
  const searchPath = locale === 'zh-cn' ? '/cn/search' : '/en/search';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'zh-cn' ? '极栈' : 'GeeStack',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}${searchPath}?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  };
}

/**
 * Combine all schemas for a page
 */
export function generatePageSchemas(locale: Locale): Record<string, unknown>[] {
  return [generateOrganizationSchema(locale), generateWebSiteSchema(locale)];
}
