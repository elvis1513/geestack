/**
 * Per-page SEO metadata configuration
 * Centralized source for all page metadata
 * Bilingual support (zh-cn, en)
 */

import { Locale } from '../../navigation/config';
import { MetaTagConfig } from '../types/seo';

// Site defaults
const SITE_NAME_ZH = '极栈 GeeStack';
const SITE_NAME_EN = 'GeeStack';

const DEFAULT_OG_IMAGE = '/images/og-default-1200x630.png';

export const pageMetaConfig: MetaTagConfig = {
  home: {
    'zh-cn': {
      title: `${SITE_NAME_ZH} - 企业级数字化转型解决方案`,
      description: '极栈(GeeStack)提供云计算、大数据、人工智能等企业级数字化转型解决方案，助力企业实现智能化升级。',
      keywords: '极栈, GeeStack, 数字化转型, 云计算, 大数据, 人工智能',
      og: {
        title: `${SITE_NAME_ZH} - 企业级数字化转型解决方案`,
        description: '极栈(GeeStack)提供云计算、大数据、人工智能等企业级数字化转型解决方案',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
    en: {
      title: `${SITE_NAME_EN} - Enterprise Digital Transformation Solutions`,
      description: 'GeeStack provides enterprise-grade digital transformation solutions including cloud computing, big data, and AI.',
      keywords: 'GeeStack, digital transformation, cloud computing, big data, AI',
      og: {
        title: `${SITE_NAME_EN} - Enterprise Digital Transformation Solutions`,
        description: 'GeeStack provides enterprise-grade digital transformation solutions',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
  },

  products: {
    'zh-cn': {
      title: `产品与解决方案 - ${SITE_NAME_ZH}`,
      description: '探索极栈的全栈产品线与行业解决方案，包括云计算平台、数据智能、AI应用等核心产品。',
      keywords: '极栈产品, 解决方案, 云计算平台, 数据智能, AI应用',
      og: {
        title: `产品与解决方案 - ${SITE_NAME_ZH}`,
        description: '探索极栈的全栈产品线与行业解决方案',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
    en: {
      title: `Products & Solutions - ${SITE_NAME_EN}`,
      description: "Explore GeeStack's comprehensive product portfolio and industry solutions.",
      keywords: 'GeeStack products, solutions, cloud platform, data intelligence, AI',
      og: {
        title: `Products & Solutions - ${SITE_NAME_EN}`,
        description: "Explore GeeStack's comprehensive product portfolio",
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
  },

  resources: {
    'zh-cn': {
      title: `资料中心 - ${SITE_NAME_ZH}`,
      description: '获取极栈最新技术文档、白皮书、产品手册等资料资源。',
      keywords: '极栈资料, 技术文档, 白皮书, 产品手册',
      og: {
        title: `资料中心 - ${SITE_NAME_ZH}`,
        description: '获取极栈最新技术文档、白皮书、产品手册等资料资源',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
    en: {
      title: `Resources - ${SITE_NAME_EN}`,
      description: "Access GeeStack's latest technical documentation, whitepapers, and product manuals.",
      keywords: 'GeeStack resources, documentation, whitepaper, manual',
      og: {
        title: `Resources - ${SITE_NAME_EN}`,
        description: "Access GeeStack's latest technical documentation",
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
  },

  cases: {
    'zh-cn': {
      title: `案例中心 - ${SITE_NAME_ZH}`,
      description: '浏览极栈在各行业的成功案例，了解我们如何助力企业实现数字化转型。',
      keywords: '极栈案例, 成功案例, 数字化转型案例, 行业解决方案',
      og: {
        title: `案例中心 - ${SITE_NAME_ZH}`,
        description: '浏览极栈在各行业的成功案例',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
    en: {
      title: `Case Studies - ${SITE_NAME_EN}`,
      description: "Explore GeeStack's success stories across various industries.",
      keywords: 'GeeStack cases, success stories, case studies',
      og: {
        title: `Case Studies - ${SITE_NAME_EN}`,
        description: "Explore GeeStack's success stories across various industries",
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
  },

  contact: {
    'zh-cn': {
      title: `联系我们 - ${SITE_NAME_ZH}`,
      description: '联系极栈获取专业的企业级解决方案咨询服务。',
      keywords: '联系极栈, 极栈客服, 商务合作, 技术咨询',
      og: {
        title: `联系我们 - ${SITE_NAME_ZH}`,
        description: '联系极栈获取专业的企业级解决方案咨询服务',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
    en: {
      title: `Contact Us - ${SITE_NAME_EN}`,
      description: 'Contact GeeStack for professional enterprise solution consulting.',
      keywords: 'contact GeeStack, customer service, business inquiry',
      og: {
        title: `Contact Us - ${SITE_NAME_EN}`,
        description: 'Contact GeeStack for professional enterprise solution consulting',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
  },

  search: {
    'zh-cn': {
      title: `站内搜索 - ${SITE_NAME_ZH}`,
      description: '搜索极栈网站的内容、产品、案例和资料。',
      noindex: true, // Search pages typically noindex
      og: {
        title: `站内搜索 - ${SITE_NAME_ZH}`,
        description: '搜索极栈网站的内容、产品、案例和资料',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
    en: {
      title: `Site Search - ${SITE_NAME_EN}`,
      description: 'Search GeeStack website for content, products, cases, and resources.',
      noindex: true,
      og: {
        title: `Site Search - ${SITE_NAME_EN}`,
        description: 'Search GeeStack website for content and resources',
        image: DEFAULT_OG_IMAGE,
        type: 'website',
      },
    },
  },

  'not-found': {
    'zh-cn': {
      title: `页面未找到 - ${SITE_NAME_ZH}`,
      description: '您访问的页面不存在。',
      noindex: true, // 404 pages should not be indexed
    },
    en: {
      title: `Page Not Found - ${SITE_NAME_EN}`,
      description: 'The page you are looking for does not exist.',
      noindex: true,
    },
  },
};
