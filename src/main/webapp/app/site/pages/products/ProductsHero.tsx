/**
 * Products Hero Section
 */

import React from 'react';
import * as styles from './products.module.css';

export interface ProductsHeroProps {
  locale?: 'zh-cn' | 'en';
}

export const ProductsHero: React.FC<ProductsHeroProps> = ({ locale = 'zh-cn' }) => {
  const title = locale === 'zh-cn' ? '产品与解决方案' : 'Products & Solutions';
  const subtitle =
    locale === 'zh-cn' ? '云、边、智融合的全栈算力解决方案产品与服务' : 'Cloud-edge-AI integrated full-stack computing solutions';

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
};
