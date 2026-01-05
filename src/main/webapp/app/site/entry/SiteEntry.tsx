/**
 * GeeStack Site Entry Component
 *
 * This is the main entry point for the public website.
 * It integrates Header, Footer, and page content with locale handling.
 *
 * Source: AGENTS.md Chapter 6 - Entry Container
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { Locale, RouteKey } from '../navigation/config';
import { MetaTags } from '../seo/MetaTags';
import { useSEOMetadata } from '../seo/hooks/useSEOMetadata';
import type { HeaderProps } from '../layout/Header';
import type { FooterProps } from '../layout/Footer';
import * as styles from './SiteEntry.module.css';

// Code splitting with React.lazy for better performance
// Each page component will be loaded on-demand
const HomePage = lazy(() => import('../pages/home').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('../pages/products').then(m => ({ default: m.ProductsPage })));
const ResourcesPage = lazy(() => import('../pages/resources').then(m => ({ default: m.ResourcesPage })));
const CasesPage = lazy(() => import('../pages/cases').then(m => ({ default: m.CasesPage })));
const ContactPage = lazy(() => import('../pages/contact').then(m => ({ default: m.ContactPage })));
const SearchPage = lazy(() => import('../pages/search').then(m => ({ default: m.SearchPage })));
const NotFoundPage = lazy(() => import('../pages/not-found').then(m => ({ default: m.NotFoundPage })));

// Loading fallback component for lazy-loaded pages
const PageLoader: React.FC = () => (
  <div className={styles.pageLoader} role="status" aria-label="Loading page">
    <div className={styles.spinner} aria-hidden="true"></div>
  </div>
);

export interface SiteEntryProps {
  locale?: Locale;
  routeKey?: string;
}

const SiteEntryContent: React.FC<SiteEntryProps> = ({ locale: initialLocale = 'zh-cn', routeKey: routeKeyProp = 'home' }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Detect locale from URL path
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      setLocale('en');
    } else if (path.startsWith('/cn')) {
      setLocale('zh-cn');
    } else {
      // Default to zh-cn, redirect to /cn
      if (path === '/') {
        window.location.href = '/cn';
      }
    }
  }, []);

  // Get SEO metadata
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const routeKey: RouteKey = routeKeyProp as RouteKey;
  const seo = useSEOMetadata({ routeKey, locale });

  // Handle locale change
  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);

    // Navigate to new locale path
    const currentPath = window.location.pathname;
    const newPath = switchLocaleInPath(currentPath, locale, newLocale);
    if (newPath !== currentPath) {
      window.location.href = newPath;
    }
  };

  // Switch locale in path
  const switchLocaleInPath = (path: string, from: Locale, to: Locale): string => {
    const fromPrefix = from === 'zh-cn' ? '/cn' : '/en';
    const toPrefix = to === 'zh-cn' ? '/cn' : '/en';

    if (path.startsWith(fromPrefix)) {
      return path.replace(fromPrefix, toPrefix);
    }

    return toPrefix;
  };

  // Get current path without locale prefix
  const getCurrentPath = () => {
    const path = window.location.pathname;
    const prefix = locale === 'zh-cn' ? '/cn' : '/en';
    return path.startsWith(prefix) ? path.slice(prefix.length) : path;
  };

  const currentPath = getCurrentPath();

  // Render page based on routeKey with Suspense for lazy loading
  const renderPage = () => {
    switch (routeKey) {
      case 'not-found':
        return (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage locale={locale} />
          </Suspense>
        );
      case 'search':
        return (
          <Suspense fallback={<PageLoader />}>
            <SearchPage locale={locale} />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<PageLoader />}>
            <ContactPage locale={locale} />
          </Suspense>
        );
      case 'cases':
        return (
          <Suspense fallback={<PageLoader />}>
            <CasesPage locale={locale} />
          </Suspense>
        );
      case 'resources':
        return (
          <Suspense fallback={<PageLoader />}>
            <ResourcesPage locale={locale} />
          </Suspense>
        );
      case 'products':
        return (
          <Suspense fallback={<PageLoader />}>
            <ProductsPage locale={locale} />
          </Suspense>
        );
      case 'home':
      default:
        return (
          <Suspense fallback={<PageLoader />}>
            <HomePage locale={locale} />
          </Suspense>
        );
    }
  };

  return (
    <>
      {/* Meta tags for SEO */}
      <MetaTags seo={seo} />

      <div className={styles.siteEntry}>
        {/* Header */}
        <Header locale={locale} currentPath={currentPath} onLocaleChange={handleLocaleChange} />

        {/* Main Content */}
        <main className={styles.main} role="main">
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer locale={locale} onLocaleChange={handleLocaleChange} />
      </div>
    </>
  );
};

export const SiteEntry: React.FC<SiteEntryProps> = props => {
  return (
    <HelmetProvider>
      <SiteEntryContent {...props} />
    </HelmetProvider>
  );
};
