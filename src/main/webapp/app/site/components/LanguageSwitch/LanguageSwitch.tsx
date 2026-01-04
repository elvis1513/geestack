/**
 * Language Switch Component
 *
 * Source: docs/ui-lockfiles/12-component-language-switch.md
 * - Desktop: Dropdown menu
 * - Mobile: Option list
 * - Switch rule: Keep routeKey, replace locale prefix (/cn ↔ /en)
 */

import React, { useState, useRef, useEffect } from 'react';
import type { Locale } from '../../navigation/config';
import * as styles from './LanguageSwitch.module.css';

export interface LanguageSwitchProps {
  currentLocale?: Locale;
  currentPath?: string;
  onLocaleChange?: (locale: Locale) => void;
  variant?: 'dropdown' | 'button';
}

const LOCALES: Array<{ value: Locale; label: string; nativeLabel: string }> = [
  { value: 'zh-cn', label: '简体中文', nativeLabel: '中文' },
  { value: 'en', label: 'English', nativeLabel: 'EN' },
];

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  currentLocale = 'zh-cn',
  currentPath = '/',
  onLocaleChange,
  variant = 'button',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Get current locale info
  const currentLocaleInfo = LOCALES.find(l => l.value === currentLocale) || LOCALES[0];

  // Handle locale change
  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    onLocaleChange?.(newLocale);

    // Navigate to new locale path
    const newPath = switchLocaleInPath(currentPath, currentLocale, newLocale);
    if (newPath !== currentPath) {
      window.location.href = newPath;
    }
  };

  // Switch locale in path
  const switchLocaleInPath = (path: string, from: Locale, to: Locale): string => {
    // Handle root paths
    if (path === `/${from.replace('zh-', '')}` || path === '/') {
      return `/${to.replace('zh-', '')}`;
    }

    // Replace locale prefix in path
    const fromPrefix = `/${from.replace('zh-', '')}`;
    const toPrefix = `/${to.replace('zh-', '')}`;

    if (path.startsWith(fromPrefix)) {
      return path.replace(fromPrefix, toPrefix);
    }

    // Default to new locale home if no match
    return toPrefix;
  };

  if (variant === 'button') {
    return (
      <button
        className={styles.button}
        onClick={() => handleLocaleChange(currentLocale === 'zh-cn' ? 'en' : 'zh-cn')}
        aria-label={`Switch to ${currentLocale === 'zh-cn' ? 'English' : '简体中文'}`}
      >
        {currentLocale === 'zh-cn' ? 'EN' : '中文'}
      </button>
    );
  }

  // Dropdown variant
  return (
    <div ref={containerRef} className={styles.dropdown}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.currentLabel}>{currentLocaleInfo.nativeLabel}</span>
        <span className={styles.arrow} />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {LOCALES.map(locale => (
            <li key={locale.value}>
              <button
                className={`${styles.option} ${locale.value === currentLocale ? styles.selected : ''}`}
                onClick={() => handleLocaleChange(locale.value)}
                role="option"
                aria-selected={locale.value === currentLocale}
              >
                <span className={styles.label}>{locale.label}</span>
                {locale.value === currentLocale && <span className={styles.check} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
