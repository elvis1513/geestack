/**
 * Custom hook for managing SEO metadata
 * Combines page config with route and locale information
 */

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Locale, RouteKey } from '../../navigation/config';
import { SEOMetadata } from '../types/seo';
import { pageMetaConfig } from '../config/pageMetaConfig';
import { getCanonicalUrl } from '../utils/canonical';
import { generateHreflangEntries } from '../utils/hreflang';
import { generatePageSchemas } from '../utils/structuredData';

const DEFAULT_OG_IMAGE = '/images/og-default-1200x630.png';

interface UseSEOMetadataParams {
  routeKey: RouteKey;
  locale: Locale;
}

export function useSEOMetadata({ routeKey, locale }: UseSEOMetadataParams): SEOMetadata {
  const location = useLocation();

  return useMemo(() => {
    // Get page-specific metadata
    const pageConfig = pageMetaConfig[routeKey]?.[locale] || pageMetaConfig.home[locale];

    // Get current path
    const currentPath = location.pathname;

    // Build canonical URL
    const canonical = pageConfig.canonical || getCanonicalUrl(currentPath, locale);

    // Generate hreflang entries
    const hreflang = generateHreflangEntries(currentPath, locale);

    // Build Open Graph metadata
    const og = {
      title: pageConfig.og?.title || pageConfig.title,
      description: pageConfig.og?.description || pageConfig.description,
      image: pageConfig.og?.image || DEFAULT_OG_IMAGE,
      type: pageConfig.og?.type || 'website',
      url: canonical,
    };

    // Generate structured data
    const structuredData = pageConfig.structuredData || generatePageSchemas(locale)[0];

    return {
      title: pageConfig.title,
      description: pageConfig.description,
      keywords: pageConfig.keywords,
      canonical,
      hreflang,
      og,
      locale,
      noindex: pageConfig.noindex,
      structuredData,
    };
  }, [routeKey, locale, location.pathname]);
}
