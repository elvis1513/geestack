/**
 * Products & Solutions Page
 *
 * Source: docs/ui-lockfiles/21-page-products.md
 * - Product catalog with category navigation
 * - 3-column grid for products and solutions
 */

import React from 'react';
import { ProductsHero } from './ProductsHero';
import { CategoryNav } from './CategoryNav';
import { ProductCard } from '../../components/ProductCard';
import { SolutionCard } from '../../components/SolutionCard';
import * as styles from './products.module.css';

export interface ProductsPageProps {
  locale?: 'zh-cn' | 'en';
}

// Static product data (placeholder)
const PRODUCT_CATEGORIES = {
  'zh-cn': [
    {
      id: 'servers',
      title: '服务器',
      products: [
        {
          id: 1,
          title: '机架式服务器',
          description: '高性能机架式服务器，支撑企业核心业务',
          gradient: 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)',
        },
        {
          id: 2,
          title: '刀片服务器',
          description: '高密度刀片服务器，节省数据中心空间',
          gradient: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
        },
        {
          id: 3,
          title: '高性能服务器',
          description: 'AI训练与HPC优化，极致算力性能',
          gradient: 'linear-gradient(135deg, #0d1b2a 0%, #415a77 100%)',
        },
      ],
    },
    {
      id: 'storage',
      title: '存储',
      products: [
        {
          id: 4,
          title: '全闪存存储',
          description: '超低延迟，极致性能',
          gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        },
        {
          id: 5,
          title: '混合存储',
          description: '性能与容量的完美平衡',
          gradient: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
        },
        {
          id: 6,
          title: '分布式存储',
          description: '弹性扩展，海量数据管理',
          gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        },
      ],
    },
    {
      id: 'network',
      title: '网络',
      products: [
        {
          id: 7,
          title: '交换机',
          description: '高性能数据中心交换机',
          gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        },
        {
          id: 8,
          title: '路由器',
          description: '智能路由，高效转发',
          gradient: 'linear-gradient(135deg, #34495e 0%, #2ecc71 100%)',
        },
        {
          id: 9,
          title: '无线网络',
          description: 'Wi-Fi 6/6E，全场景覆盖',
          gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
        },
      ],
    },
  ],
  en: [
    {
      id: 'servers',
      title: 'Servers',
      products: [
        {
          id: 1,
          title: 'Rack Servers',
          description: 'High-performance rack servers for core business',
          gradient: 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)',
        },
        {
          id: 2,
          title: 'Blade Servers',
          description: 'High-density blade servers, space-saving',
          gradient: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
        },
        {
          id: 3,
          title: 'HPC Servers',
          description: 'Optimized for AI training and HPC',
          gradient: 'linear-gradient(135deg, #0d1b2a 0%, #415a77 100%)',
        },
      ],
    },
    {
      id: 'storage',
      title: 'Storage',
      products: [
        {
          id: 4,
          title: 'All-Flash Storage',
          description: 'Ultra-low latency, extreme performance',
          gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        },
        {
          id: 5,
          title: 'Hybrid Storage',
          description: 'Perfect balance of performance and capacity',
          gradient: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
        },
        {
          id: 6,
          title: 'Distributed Storage',
          description: 'Elastic scalability for massive data',
          gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        },
      ],
    },
    {
      id: 'network',
      title: 'Network',
      products: [
        {
          id: 7,
          title: 'Switches',
          description: 'High-performance datacenter switches',
          gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        },
        {
          id: 8,
          title: 'Routers',
          description: 'Intelligent routing, efficient forwarding',
          gradient: 'linear-gradient(135deg, #34495e 0%, #2ecc71 100%)',
        },
        {
          id: 9,
          title: 'Wireless Network',
          description: 'Wi-Fi 6/6E, full scenario coverage',
          gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
        },
      ],
    },
  ],
};

// Solutions data
const SOLUTIONS = {
  'zh-cn': [
    {
      id: 1,
      title: '智算中心解决方案',
      description: '全栈算力基础设施，助力AI时代',
      icon: '🖥️',
    },
    {
      id: 2,
      title: '云服务解决方案',
      description: '弹性云平台，快速业务上线',
      icon: '☁️',
    },
    {
      id: 3,
      title: '边缘计算解决方案',
      description: '云边协同，降低时延',
      icon: '🌐',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Intelligent Computing',
      description: 'Full-stack computing infrastructure for AI era',
      icon: '🖥️',
    },
    {
      id: 2,
      title: 'Cloud Services',
      description: 'Elastic cloud platform for rapid deployment',
      icon: '☁️',
    },
    {
      id: 3,
      title: 'Edge Computing',
      description: 'Cloud-edge collaboration, reduced latency',
      icon: '🌐',
    },
  ],
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ locale = 'zh-cn' }) => {
  const categories = PRODUCT_CATEGORIES[locale];
  const solutions = SOLUTIONS[locale];
  const [activeCategory, setActiveCategory] = React.useState(categories[0].id);

  const activeProducts = categories.find(cat => cat.id === activeCategory)?.products || [];

  return (
    <div className={styles.page}>
      <ProductsHero locale={locale} />
      <CategoryNav categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} locale={locale} />

      {/* Products Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {activeProducts.map(product => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.gradient}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{locale === 'zh-cn' ? '解决方案' : 'Solutions'}</h2>
          <div className={styles.grid}>
            {solutions.map(solution => (
              <SolutionCard
                key={solution.id}
                title={solution.title}
                description={solution.description}
                icon={solution.icon}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
