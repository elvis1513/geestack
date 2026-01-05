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
      description: '机架服务器、AI服务器、整机柜服务器',
      icon: '/content/images/icons/server.svg',
      link: '/cn/products/servers',
    },
    {
      id: 2,
      title: '操作系统',
      description: '企业级Linux操作系统',
      icon: '/content/images/icons/system.svg',
      link: '/cn/products/os',
    },
    {
      id: 3,
      title: '大模型加速引擎',
      description: 'AI大模型加速与优化',
      icon: '/content/images/icons/ai-engine.svg',
      link: '/cn/products/ai-engine',
    },
    {
      id: 4,
      title: '超融合解决方案',
      description: '极简、智能、可靠的超融合基础设施',
      icon: '/content/images/icons/hci-solution.svg',
      link: '/cn/products/hci',
    },
    {
      id: 5,
      title: '高性能计算解决方案',
      description: 'HPC全栈解决方案',
      icon: '/content/images/icons/hpc-solution.svg',
      link: '/cn/products/hpc',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Servers',
      description: 'Rack servers, AI servers, rack-scale servers',
      icon: '/content/images/icons/server.svg',
      link: '/en/products/servers',
    },
    {
      id: 2,
      title: 'Operating System',
      description: 'Enterprise-grade Linux operating system',
      icon: '/content/images/icons/system.svg',
      link: '/en/products/os',
    },
    {
      id: 3,
      title: 'AI Acceleration Engine',
      description: 'AI model acceleration and optimization',
      icon: '/content/images/icons/ai-engine.svg',
      link: '/en/products/ai-engine',
    },
    {
      id: 4,
      title: 'HCI Solutions',
      description: 'Simple, intelligent, reliable HCI infrastructure',
      icon: '/content/images/icons/hci-solution.svg',
      link: '/en/products/hci',
    },
    {
      id: 5,
      title: 'HPC Solutions',
      description: 'Full-stack HPC solutions',
      icon: '/content/images/icons/hpc-solution.svg',
      link: '/en/products/hpc',
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
            <div className={styles.iconWrapper}>
              <img src={product.icon} alt={product.title} className={styles.icon} />
            </div>
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
