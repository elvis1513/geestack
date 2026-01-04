/**
 * GeeStack Header Component
 *
 * Source: docs/ui-lockfiles/10-layout-header-megamenu.md
 * - Height: 80px
 * - Position: fixed, z-index: 99
 * - Transparent at top, white + shadow on scroll
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { tokens } from '../../theme';
import { siteNavigation } from '../../navigation/config';
import { HeaderProps, NavItem } from './types';
import { MegaMenu } from './MegaMenu';
import { SearchModal } from '../SearchModal';
import * as styles from './Header.module.css';

export const Header: React.FC<HeaderProps> = ({ locale = 'zh-cn', currentPath = '/', onLocaleChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll handler for transparent → solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Clear hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Get label for current locale
  const getLabel = (item: any) => {
    return locale === 'zh-cn' ? item.label['zh-cn'] : item.label.en;
  };

  const getPath = (item: any) => {
    if (!item.path) return '#';
    return locale === 'zh-cn' ? item.path['zh-cn'] : item.path.en;
  };

  // Nav item hover handler with 80ms delay
  const handleNavHover = (item: any, isOpen: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (isOpen && item.children) {
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveNavItem(item.key);
        setMegaMenuOpen(true);
      }, 80);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setMegaMenuOpen(false);
        setActiveNavItem(null);
      }, 80);
    }
  };

  // Nav item click handler
  const handleNavClick = (item: any) => {
    if (item.children) {
      // Toggle mega menu on click
      if (activeNavItem === item.key && megaMenuOpen) {
        setMegaMenuOpen(false);
        setActiveNavItem(null);
      } else {
        setActiveNavItem(item.key);
        setMegaMenuOpen(true);
      }
    } else {
      // Navigate to page
      window.location.href = getPath(item);
    }
  };

  // Close mega menu
  const closeMegaMenu = () => {
    setMegaMenuOpen(false);
    setActiveNavItem(null);
  };

  // Get home path
  const homePath = locale === 'zh-cn' ? '/cn' : '/en';

  return (
    <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <a href={homePath} className={styles.logo} aria-label="GeeStack Home">
          <div className={styles.logoIcon}>G</div>
          <span className={styles.logoText}>GeeStack</span>
        </a>

        {/* Navigation */}
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            {siteNavigation.map(item => (
              <li
                key={item.key}
                className={styles.navItem}
                onMouseEnter={() => handleNavHover(item, true)}
                onMouseLeave={() => handleNavHover(item, false)}
              >
                <button
                  className={`${styles.navLink} ${activeNavItem === item.key ? styles.active : ''}`}
                  onClick={() => handleNavClick(item)}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children && activeNavItem === item.key ? 'true' : undefined}
                >
                  {getLabel(item)}
                  {item.children && <span className={styles.arrow} />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions (Language Switch, Search) */}
        <div className={styles.actions}>
          {/* Search Icon */}
          <button className={styles.searchBtn} aria-label="Search" onClick={() => setSearchModalOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Language Switch */}
          <button
            className={styles.langBtn}
            onClick={() => onLocaleChange?.(locale === 'zh-cn' ? 'en' : 'zh-cn')}
            aria-label={`Switch to ${locale === 'zh-cn' ? 'English' : '简体中文'}`}
          >
            {locale === 'zh-cn' ? 'EN' : '中文'}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {megaMenuOpen && activeNavItem && (
        <MegaMenu
          items={siteNavigation.find(n => n.key === activeNavItem)?.children || []}
          locale={locale}
          onClose={closeMegaMenu}
          triggerRef={headerRef}
        />
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} locale={locale} />
    </header>
  );
};
