/**
 * Resources Hero Section
 */

import React from 'react';
import * as styles from './resources.module.css';

export interface ResourcesHeroProps {
  locale?: 'zh-cn' | 'en';
}

export const ResourcesHero: React.FC<ResourcesHeroProps> = ({ locale = 'zh-cn' }) => {
  const title = locale === 'zh-cn' ? '资料中心' : 'Resources';
  const subtitle =
    locale === 'zh-cn'
      ? '白皮书、技术文档、案例研究、视频教程等丰富资源，助您快速了解GeeStack产品与解决方案'
      : 'Whitepapers, technical docs, case studies, video tutorials and more to help you quickly understand GeeStack products and solutions';

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
};
