/**
 * SEO Metadata Types
 * Following AGENTS.md naming conventions
 */

import { Locale } from '../../navigation/config';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
  };
  canonical?: string; // Override default canonical
  noindex?: boolean; // For 404, internal pages
  structuredData?: Record<string, unknown>; // JSON-LD
}

export interface MetaTagConfig {
  [routeKey: string]: {
    [locale in Locale]: PageMeta;
  };
}

export interface HreflangEntry {
  locale: string;
  href: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  hreflang: HreflangEntry[];
  og: {
    title: string;
    description: string;
    image: string;
    type: string;
    url: string;
  };
  locale: Locale;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}
