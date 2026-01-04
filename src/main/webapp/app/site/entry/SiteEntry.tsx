/**
 * GeeStack Site Entry Component
 *
 * This is the main entry point for the public website.
 * It integrates Header, Footer, and page content with locale handling.
 *
 * Source: AGENTS.md Chapter 6 - Entry Container
 */

import React, { useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { Locale } from '../navigation/config';
import { HomePage } from '../pages/home';
import { ProductsPage } from '../pages/products';
import { ResourcesPage } from '../pages/resources';
import { CasesPage } from '../pages/cases';
import { ContactPage } from '../pages/contact';
import { SearchPage } from '../pages/search';
import { NotFoundPage } from '../pages/not-found';
import type { HeaderProps } from '../layout/Header';
import type { FooterProps } from '../layout/Footer';
import * as styles from './SiteEntry.module.css';

export interface SiteEntryProps {
  locale?: Locale;
  routeKey?: string;
}

export const SiteEntry: React.FC<SiteEntryProps> = ({ locale: initialLocale = 'zh-cn', routeKey = 'home' }) => {
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

  // Render page based on routeKey
  const renderPage = () => {
    switch (routeKey) {
      case 'not-found':
        return <NotFoundPage locale={locale} />;
      case 'search':
        return <SearchPage locale={locale} />;
      case 'contact':
        return <ContactPage locale={locale} />;
      case 'cases':
        return <CasesPage locale={locale} />;
      case 'resources':
        return <ResourcesPage locale={locale} />;
      case 'products':
        return <ProductsPage locale={locale} />;
      case 'home':
      default:
        return <HomePage locale={locale} />;
    }
  };

  return (
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
  );
};
