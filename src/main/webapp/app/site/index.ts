/**
 * GeeStack Site Module
 *
 * Main export point for the site module.
 * Imports styles to ensure CSS variables are globally available.
 *
 * Source: AGENTS.md Chapter 6
 */

import './styles';

export { siteRoutes } from './routes';
export type { Locale, RouteKey, NavigationItem } from './navigation/config';
