/**
 * GeeStack Site Routes
 *
 * Route configuration for the public website.
 * Supports both zh-cn (/cn) and en (/en) locales.
 *
 * Source: docs/specs/ui.md - Information Architecture
 */

import { lazy } from 'react';
import { Locale } from '../navigation/config';

// Lazy load pages for code splitting
const SiteEntry = lazy(() => import('../entry').then(m => ({ default: m.SiteEntry })));

export interface SiteRoute {
  path: string;
  locale: Locale;
  routeKey: string;
  component: React.ComponentType<any>;
}

/**
 * Site routes configuration
 *
 * Route structure:
 * - /cn/* - Chinese content
 * - /en/* - English content
 * - / -> 301 redirect to /cn
 */
export const siteRoutes: SiteRoute[] = [
  // Home routes
  {
    path: '/cn',
    locale: 'zh-cn',
    routeKey: 'home',
    component: SiteEntry,
  },
  {
    path: '/en',
    locale: 'en',
    routeKey: 'home',
    component: SiteEntry,
  },

  // Products & Solutions
  {
    path: '/cn/products-and-solutions',
    locale: 'zh-cn',
    routeKey: 'products',
    component: SiteEntry,
  },
  {
    path: '/en/products-and-solutions',
    locale: 'en',
    routeKey: 'products',
    component: SiteEntry,
  },

  // Resources
  {
    path: '/cn/resources',
    locale: 'zh-cn',
    routeKey: 'resources',
    component: SiteEntry,
  },
  {
    path: '/en/resources',
    locale: 'en',
    routeKey: 'resources',
    component: SiteEntry,
  },

  // Cases
  {
    path: '/cn/cases',
    locale: 'zh-cn',
    routeKey: 'cases',
    component: SiteEntry,
  },
  {
    path: '/en/cases',
    locale: 'en',
    routeKey: 'cases',
    component: SiteEntry,
  },

  // Services
  // { path: '/cn/services', locale: 'zh-cn', routeKey: 'services', component: SiteEntry },
  // { path: '/en/services', locale: 'en', routeKey: 'services', component: SiteEntry },

  // Partners
  // { path: '/cn/partners', locale: 'zh-cn', routeKey: 'partners', component: SiteEntry },
  // { path: '/en/partners', locale: 'en', routeKey: 'partners', component: SiteEntry },

  // Support
  // { path: '/cn/support', locale: 'zh-cn', routeKey: 'support', component: SiteEntry },
  // { path: '/en/support', locale: 'en', routeKey: 'support', component: SiteEntry },

  // About
  // { path: '/cn/about', locale: 'zh-cn', routeKey: 'about', component: SiteEntry },
  // { path: '/en/about', locale: 'en', routeKey: 'about', component: SiteEntry },
];

/**
 * Get route by path
 */
export function getRouteByPath(path: string): SiteRoute | undefined {
  // Exact match
  const exactMatch = siteRoutes.find(route => route.path === path);
  if (exactMatch) return exactMatch;

  // Prefix match (for sub-paths)
  return siteRoutes.find(route => path.startsWith(route.path + '/') || path === route.path);
}

/**
 * Get locale from path
 */
export function getLocaleFromPath(path: string): Locale {
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/cn')) return 'zh-cn';
  return 'zh-cn'; // Default
}

/**
 * Get route key from path
 */
export function getRouteKeyFromPath(path: string): string {
  const route = getRouteByPath(path);
  return route?.routeKey || 'home';
}
