/**
 * Contact Hero Section
 */

import React from 'react';
import * as styles from './contact.module.css';

export interface ContactHeroProps {
  locale?: 'zh-cn' | 'en';
}

export const ContactHero: React.FC<ContactHeroProps> = ({ locale = 'zh-cn' }) => {
  const title = locale === 'zh-cn' ? '联系我们' : 'Contact Us';
  const subtitle =
    locale === 'zh-cn'
      ? '我们随时为您提供专业的产品咨询和技术支持服务'
      : 'We are ready to provide professional product consulting and technical support';

  return (
    <section className={styles.hero} aria-labelledby="contact-hero-title">
      <div className={styles.heroContainer}>
        <h1 id="contact-hero-title" className={styles.heroTitle}>
          {title}
        </h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
};

export default ContactHero;
