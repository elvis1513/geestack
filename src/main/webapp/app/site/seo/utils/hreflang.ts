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
  const entries: HreflangEntry[] = [
    {
      locale: 'zh-CN',
      href: getCanonicalUrl(path, 'zh-cn'),
    },
    {
      locale: 'en',
      href: getCanonicalUrl(path, 'en'),
    },
    {
      locale: 'x-default',
      href: getCanonicalUrl(path, 'zh-cn'), // Default to Chinese
    },
  ];

  return entries;
}
