/**
 * SEO module barrel export
 * Exports all SEO-related components and utilities
 */

export { MetaTags } from './MetaTags';
export { useSEOMetadata } from './hooks/useSEOMetadata';
export type { PageMeta, SEOMetadata, HreflangEntry, MetaTagConfig } from './types/seo';
export { pageMetaConfig } from './config/pageMetaConfig';
export { getCanonicalUrl, getAlternateUrl } from './utils/canonical';
export { generateHreflangEntries } from './utils/hreflang';
export { generateOrganizationSchema, generateWebSiteSchema, generatePageSchemas } from './utils/structuredData';
