/**
 * GeeStack Footer Component
 *
 * Source: docs/ui-lockfiles/11-layout-footer.md
 * - 5 columns (About, News, Products, Partners, Resources)
 * - Padding: 64px (desktop), 40px (mobile)
 * - Social links: Weibo, Toutiao, Bilibili, Twitter, Facebook, LinkedIn, YouTube
 */

import React, { useState } from 'react';
import { footerNavigation, legalNavigation, Locale } from '../../navigation/config';
import { FooterProps } from './types';
import { FooterColumn } from './FooterColumn';
import { SocialLinks } from '../../components/SocialLinks';
import * as styles from './Footer.module.css';

export const Footer: React.FC<FooterProps> = ({ locale = 'zh-cn', onLocaleChange }) => {
  const [expandedColumns, setExpandedColumns] = useState<Set<string>>(new Set(['about']));

  // Get label for current locale
  const getLabel = (item: any) => {
    return locale === 'zh-cn' ? item.label['zh-cn'] : item.label.en;
  };

  const getPath = (item: any) => {
    if (!item.path) return '#';
    return locale === 'zh-cn' ? item.path['zh-cn'] : item.path.en;
  };

  // Transform navigation data to footer columns
  const columns = footerNavigation.map(section => ({
    title: getLabel(section),
    links: (section.children || []).map(item => ({
      key: item.key,
      label: getLabel(item),
      path: getPath(item),
    })),
  }));

  // Transform legal links
  const legalLinks = legalNavigation.map(item => ({
    key: item.key,
    label: getLabel(item),
    path: getPath(item),
  }));

  // Toggle column expansion (mobile accordion)
  const toggleColumn = (key: string) => {
    setExpandedColumns(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Get column key from index
  const getColumnKey = (index: number) => {
    return footerNavigation[index]?.key || `column-${index}`;
  };

  const homePath = locale === 'zh-cn' ? '/cn' : '/en';

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Footer Columns */}
      <div className={styles.columns}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {columns.map((column, index) => {
              const key = getColumnKey(index);
              const isExpanded = expandedColumns.has(key);

              return (
                <FooterColumn
                  key={key}
                  title={column.title}
                  links={column.links}
                  isExpanded={isExpanded}
                  onToggle={() => toggleColumn(key)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            {/* Logo + Social Links */}
            <div className={styles.brand}>
              <a href={homePath} className={styles.logo}>
                <div className={styles.logoIcon}>G</div>
                <span>GeeStack</span>
              </a>
              <SocialLinks locale={locale} />
            </div>

            {/* Legal Links */}
            <nav className={styles.legal} aria-label="Legal navigation">
              <ul className={styles.legalList}>
                {legalLinks.map(link => (
                  <li key={link.key}>
                    <a href={link.path} className={styles.legalLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Copyright */}
            <div className={styles.copyright}>© {new Date().getFullYear()} GeeStack. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
