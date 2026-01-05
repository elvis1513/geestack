/**
 * Hreflang tag generation utilities
 * Creates hreflang links for bilingual SEO
 */

import { Locale } from '../../navigation/config';
import { getCanonicalUrl } from './canonical';
import { HreflangEntry } from '../types/seo';

/**
 * Generate hreflang entries for a page
 */
export function generateHreflangEntries(path: string, locale: Locale): HreflangEntry[] {
  // Get the path without locale prefix
  const cleanPath = path.replace(/^\/(cn|en)/, '') || '/';

  const entries: HreflangEntry[] = [
    {
      locale: 'zh-CN',
      href: getCanonicalUrl(cleanPath, 'zh-cn'),
    },
    {
      locale: 'en',
      href: getCanonicalUrl(cleanPath, 'en'),
    },
    {
      locale: 'x-default',
      href: getCanonicalUrl(cleanPath, 'zh-cn'), // Default to Chinese
    },
  ];

  return entries;
}
