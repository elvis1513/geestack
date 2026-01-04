/**
 * Cases Hero Section
 */

import React from 'react';
import * as styles from './cases.module.css';

export interface CasesHeroProps {
  locale?: 'zh-cn' | 'en';
}

export const CasesHero: React.FC<CasesHeroProps> = ({ locale = 'zh-cn' }) => {
  const title = locale === 'zh-cn' ? '案例中心' : 'Case Studies';
  const subtitle =
    locale === 'zh-cn'
      ? '探索各行业客户成功案例，了解GeeStack如何助力企业数字化转型'
      : 'Explore customer success stories across industries and see how GeeStack enables digital transformation';

  return (
    <section className={styles.hero} aria-labelledby="cases-hero-title">
      <div className={styles.heroContainer}>
        <h1 id="cases-hero-title" className={styles.heroTitle}>
          {title}
        </h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
};

export default CasesHero;
