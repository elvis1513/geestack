/**
 * MegaMenu Component
 *
 * Source: docs/ui-lockfiles/10-layout-header-megamenu.md
 * - Displays on hover with 80ms delay or on click
 * - Position: below header
 * - z-index: 100
 * - Close on ESC, click outside
 */

import React, { useEffect, useRef } from 'react';
import * as styles from './MegaMenu.module.css';

export interface MegaMenuProps {
  items: any[];
  locale: string;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ items, locale, onClose, triggerRef }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef]);

  // Focus trap (optional)
  useEffect(() => {
    if (menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTab);
    }
  }, []);

  const getLabel = (item: any) => {
    return locale === 'zh-cn' ? item.label['zh-cn'] : item.label.en;
  };

  const getPath = (item: any) => {
    if (!item.path) return '#';
    return locale === 'zh-cn' ? item.path['zh-cn'] : item.path.en;
  };

  if (items.length === 0) return null;

  return (
    <div ref={menuRef} className={styles.megaMenu} role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className={styles.container}>
        <div className={styles.grid}>
          {items.map(item => (
            <a key={item.key} href={getPath(item)} className={styles.item} onClick={onClose}>
              {getLabel(item)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
