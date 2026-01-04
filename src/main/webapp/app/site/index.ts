/**
 * GeeStack Site Module
 *
 * Main export point for the site module.
 * Imports styles to ensure CSS variables are globally available.
 *
 * Source: AGENTS.md Chapter 6
 */

import './styles';
import './entry';
import './routes';

// Re-export main components
export { SiteEntry } from './entry';
export { siteRoutes, getRouteByPath, getLocaleFromPath, getRouteKeyFromPath } from './routes';

// Re-export navigation
export * from './navigation/config';

// Re-export theme tokens
export * from './theme';

// Re-export layout components
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';

// Re-export page components
export { HomePage } from './pages/home';

// Types
export type { SiteEntryProps } from './entry';
export type { SiteRoute } from './routes';
export type { Locale, RouteKey, NavigationItem } from './navigation/config';
