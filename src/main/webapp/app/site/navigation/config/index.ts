/**
 * GeeStack Navigation Configuration
 *
 * Source: docs/specs/ui.md - Information Architecture
 * Strong-typed, bilingual navigation structure
 */

export type Locale = 'zh-cn' | 'en';
export type RouteKey = string;

export interface NavigationItem {
  key: RouteKey;
  label: {
    'zh-cn': string;
    en: string;
  };
  path?: {
    'zh-cn': string;
    en: string;
  };
  children?: NavigationItem[];
  external?: boolean;
}

/**
 * Site Navigation (Header Menu)
 */
export const siteNavigation: NavigationItem[] = [
  {
    key: 'products',
    label: {
      'zh-cn': '产品与解决方案',
      en: 'Products & Solutions',
    },
    path: {
      'zh-cn': '/cn/products-and-solutions',
      en: '/en/products-and-solutions',
    },
  },
  {
    key: 'services',
    label: {
      'zh-cn': '服务',
      en: 'Services',
    },
    path: {
      'zh-cn': '/cn/services',
      en: '/en/services',
    },
  },
  {
    key: 'partners',
    label: {
      'zh-cn': '合作伙伴',
      en: 'Partners',
    },
    path: {
      'zh-cn': '/cn/partners',
      en: '/en/partners',
    },
  },
  {
    key: 'support',
    label: {
      'zh-cn': '技术支持',
      en: 'Support',
    },
    path: {
      'zh-cn': '/cn/support',
      en: '/en/support',
    },
  },
  {
    key: 'about',
    label: {
      'zh-cn': '关于极栈',
      en: 'About GeeStack',
    },
    path: {
      'zh-cn': '/cn/about',
      en: '/en/about',
    },
  },
];

/**
 * Footer Navigation Columns
 */
export const footerNavigation: NavigationItem[] = [
  {
    key: 'about',
    label: {
      'zh-cn': '关于极栈',
      en: 'About GeeStack',
    },
    children: [
      {
        key: 'company',
        label: { 'zh-cn': '公司简介', en: 'Company' },
        path: { 'zh-cn': '/cn/about/company', en: '/en/about/company' },
      },
      {
        key: 'quality',
        label: { 'zh-cn': '质量管理', en: 'Quality' },
        path: { 'zh-cn': '/cn/about/quality', en: '/en/about/quality' },
      },
      {
        key: 'compliance',
        label: { 'zh-cn': '合规诚信', en: 'Compliance' },
        path: { 'zh-cn': '/cn/about/compliance', en: '/en/about/compliance' },
      },
      {
        key: 'careers',
        label: { 'zh-cn': '招贤纳士', en: 'Careers' },
        path: { 'zh-cn': '/cn/about/careers', en: '/en/about/careers' },
      },
      {
        key: 'contact',
        label: { 'zh-cn': '联系我们', en: 'Contact Us' },
        path: { 'zh-cn': '/cn/about/contact', en: '/en/about/contact' },
      },
    ],
  },
  {
    key: 'news',
    label: {
      'zh-cn': '新闻与活动',
      en: 'News & Events',
    },
    children: [
      {
        key: 'news',
        label: { 'zh-cn': '新闻公告', en: 'News' },
        path: { 'zh-cn': '/cn/news', en: '/en/news' },
      },
      {
        key: 'events',
        label: { 'zh-cn': '市场活动', en: 'Events' },
        path: { 'zh-cn': '/cn/events', en: '/en/events' },
      },
    ],
  },
  {
    key: 'products',
    label: {
      'zh-cn': '产品与解决方案',
      en: 'Products & Solutions',
    },
    children: [
      {
        key: 'products',
        label: { 'zh-cn': '产品', en: 'Products' },
        path: { 'zh-cn': '/cn/products', en: '/en/products' },
      },
      {
        key: 'ecosystem',
        label: { 'zh-cn': '生态创新及服务', en: 'Ecosystem & Services' },
        path: { 'zh-cn': '/cn/ecosystem', en: '/en/ecosystem' },
      },
    ],
  },
  {
    key: 'partners',
    label: {
      'zh-cn': '合作伙伴',
      en: 'Partners',
    },
    children: [
      {
        key: 'become-partner',
        label: { 'zh-cn': '成为合作伙伴', en: 'Become a Partner' },
        path: { 'zh-cn': '/cn/partners/become', en: '/en/partners/become' },
      },
      {
        key: 'partner-policy',
        label: { 'zh-cn': '伙伴政策', en: 'Partner Policy' },
        path: { 'zh-cn': '/cn/partners/policy', en: '/en/partners/policy' },
      },
      {
        key: 'partner-support',
        label: { 'zh-cn': '伙伴支持', en: 'Partner Support' },
        path: { 'zh-cn': '/cn/partners/support', en: '/en/partners/support' },
      },
    ],
  },
  {
    key: 'resources',
    label: {
      'zh-cn': '资源中心',
      en: 'Resources',
    },
    children: [
      {
        key: 'documents',
        label: { 'zh-cn': '资料中心', en: 'Documents' },
        path: { 'zh-cn': '/cn/resources/documents', en: '/en/resources/documents' },
      },
      {
        key: 'cases',
        label: { 'zh-cn': '案例中心', en: 'Cases' },
        path: { 'zh-cn': '/cn/resources/cases', en: '/en/resources/cases' },
      },
      {
        key: 'media',
        label: { 'zh-cn': '多媒体中心', en: 'Media Center' },
        path: { 'zh-cn': '/cn/resources/media', en: '/en/resources/media' },
      },
    ],
  },
];

/**
 * Legal Links
 */
export const legalNavigation: NavigationItem[] = [
  {
    key: 'privacy',
    label: { 'zh-cn': '隐私政策', en: 'Privacy Policy' },
    path: { 'zh-cn': '/cn/legal/privacy', en: '/en/legal/privacy' },
  },
  {
    key: 'terms',
    label: { 'zh-cn': '使用条款', en: 'Terms of Use' },
    path: { 'zh-cn': '/cn/legal/terms', en: '/en/legal/terms' },
  },
  {
    key: 'opt-out',
    label: { 'zh-cn': '除名查询', en: 'Opt-Out' },
    path: { 'zh-cn': '/cn/legal/opt-out', en: '/en/legal/opt-out' },
  },
];

/**
 * Get navigation item by route key
 */
export function getNavItemByKey(items: NavigationItem[], key: RouteKey): NavigationItem | undefined {
  for (const item of items) {
    if (item.key === key) return item;
    if (item.children) {
      const found = getNavItemByKey(item.children, key);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Get path for route key and locale
 */
export function getPathByKey(key: RouteKey, locale: Locale = 'zh-cn'): string | undefined {
  // Search in site navigation
  const siteItem = getNavItemByKey(siteNavigation, key);
  if (siteItem?.path) return siteItem.path[locale];

  // Search in footer navigation
  const footerItem = getNavItemByKey(footerNavigation, key);
  if (footerItem?.path) return footerItem.path[locale];

  // Search in legal navigation
  const legalItem = getNavItemByKey(legalNavigation, key);
  if (legalItem?.path) return legalItem.path[locale];

  return undefined;
}
