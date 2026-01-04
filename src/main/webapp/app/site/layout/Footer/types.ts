/**
 * Footer Component Types
 */

import { Locale } from '../../navigation/config';

export interface FooterProps {
  locale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    key: string;
    label: string;
    path: string;
  }>;
}

export interface SocialLink {
  key: string;
  label: string;
  icon: string;
  url: string;
}
