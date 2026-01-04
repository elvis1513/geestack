/**
 * Header Component Types
 */

import { Locale } from '../../navigation/config';

export interface HeaderProps {
  locale?: Locale;
  currentPath?: string;
  onLocaleChange?: (locale: Locale) => void;
}

export interface NavItem {
  key: string;
  label: string;
  path: string;
  children?: NavItem[];
}

export interface MegaMenuState {
  isOpen: boolean;
  activeKey: string | null;
  position: { left: number; top: number } | null;
}
