/**
 * Footer Column Component
 *
 * Accordion style on mobile
 */

import React from 'react';
import * as styles from './FooterColumn.module.css';

export interface FooterColumnProps {
  title: string;
  links: Array<{
    key: string;
    label: string;
    path: string;
  }>;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const FooterColumn: React.FC<FooterColumnProps> = ({ title, links, isExpanded = false, onToggle }) => {
  return (
    <div className={styles.column}>
      {/* Column Title */}
      <button className={`${styles.title} ${isExpanded ? styles.expanded : ''}`} onClick={onToggle} aria-expanded={isExpanded}>
        {title}
        <span className={styles.icon} />
      </button>

      {/* Links */}
      <ul className={`${styles.links} ${isExpanded ? styles.expanded : ''}`} hidden={!isExpanded}>
        {links.map(link => (
          <li key={link.key}>
            <a href={link.path} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
