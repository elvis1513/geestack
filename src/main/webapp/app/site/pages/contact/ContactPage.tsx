/**
 * Contact Page Component
 */

import React from 'react';
import { ContactHero } from './ContactHero';
import { ContactCard } from '../../components/ContactCard';
import { ContactForm } from '../../sections/ContactForm';
import * as styles from './contact.module.css';

export interface ContactPageProps {
  locale?: 'zh-cn' | 'en';
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ContactPage: React.FC<ContactPageProps> = ({ locale = 'zh-cn' }) => {
  const contactCards = {
    'zh-cn': [
      {
        icon: <PhoneIcon />,
        title: '销售热线',
        content: '400-888-8888',
        subtitle: '周一至周五 9:00-18:00',
      },
      {
        icon: <EmailIcon />,
        title: '技术支持',
        content: 'support@geestack.com',
        subtitle: '7x24小时服务',
      },
      {
        icon: <LocationIcon />,
        title: '公司地址',
        content: '深圳市南山区科技园',
        subtitle: '邮编：518057',
      },
    ],
    en: [
      {
        icon: <PhoneIcon />,
        title: 'Sales Hotline',
        content: '+86-755-8888-8888',
        subtitle: 'Mon-Fri 9:00-18:00',
      },
      {
        icon: <EmailIcon />,
        title: 'Technical Support',
        content: 'support@geestack.com',
        subtitle: '7x24 Service',
      },
      {
        icon: <LocationIcon />,
        title: 'Office Address',
        content: 'Nanshan District, Shenzhen',
        subtitle: 'Postal Code: 518057',
      },
    ],
  };

  return (
    <div className={styles.contactPage}>
      <ContactHero locale={locale} />

      <section className={styles.cardsSection} aria-label="Contact information">
        <div className={styles.cardsGrid}>
          {contactCards[locale].map((card, index) => (
            <ContactCard key={index} icon={card.icon} title={card.title} content={card.content} subtitle={card.subtitle} locale={locale} />
          ))}
        </div>
      </section>

      <ContactForm locale={locale} />
    </div>
  );
};

export default ContactPage;
