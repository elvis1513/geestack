/**
 * Contact Card Component
 */

import React from 'react';
import * as styles from './ContactCard.module.css';

export interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  subtitle?: string;
  locale?: 'zh-cn' | 'en';
}

export const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, subtitle, locale = 'zh-cn' }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default ContactCard;
