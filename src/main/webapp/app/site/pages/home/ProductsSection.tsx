/**
 * Products Section
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - 3 columns grid
 * - Product cards
 */

import React from 'react';
import * as styles from './ProductsSection.module.css';

export interface ProductsSectionProps {
  locale?: 'zh-cn' | 'en';
}

const PRODUCTS = {
  'zh-cn': [
    {
      id: 1,
      title: '服务器',
      description: '高性能服务器，支撑智算底座',
      image: 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)',
      link: '/cn/products/servers',
    },
    {
      id: 2,
      title: '存储',
      description: '全场景数据存储解决方案',
      image: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
      link: '/cn/products/storage',
    },
    {
      id: 3,
      title: '网络',
      description: '智能网络，联接未来',
      image: 'linear-gradient(135deg, #0d1b2a 0%, #415a77 100%)',
      link: '/cn/products/network',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Servers',
      description: 'High-performance servers for AI computing',
      image: 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)',
      link: '/en/products/servers',
    },
    {
      id: 2,
      title: 'Storage',
      description: 'All-scenario data storage solutions',
      image: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
      link: '/en/products/storage',
    },
    {
      id: 3,
      title: 'Network',
      description: 'Intelligent networking for the future',
      image: 'linear-gradient(135deg, #0d1b2a 0%, #415a77 100%)',
      link: '/en/products/network',
    },
  ],
};

export const ProductsSection: React.FC<ProductsSectionProps> = ({ locale = 'zh-cn' }) => {
  const products = PRODUCTS[locale];
  const sectionTitle = locale === 'zh-cn' ? '算力产品与解决方案' : 'Products & Solutions';
  const sectionDescription =
    locale === 'zh-cn'
      ? '云、边、智融合的全栈算力解决方案产品与服务，帮助客户重构算力设施，跨越生态裂谷，加速AI行业应用落地'
      : 'Cloud-edge-AI integrated full-stack computing solutions to help rebuild infrastructure, bridge ecosystem gaps, and accelerate AI industry applications';
  const viewAllText = locale === 'zh-cn' ? '查看全部' : 'View All';

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <p className={styles.description}>{sectionDescription}</p>
        </div>
        <a href={locale === 'zh-cn' ? '/cn/products' : '/en/products'} className={styles.viewAll}>
          {viewAllText} →
        </a>
      </div>
      <div className={styles.grid}>
        {products.map(product => (
          <a key={product.id} href={product.link} className={styles.card}>
            <div className={styles.image} style={{ background: product.image }} />
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDescription}>{product.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
