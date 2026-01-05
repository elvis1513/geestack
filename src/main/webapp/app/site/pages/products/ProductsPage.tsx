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

// Static product data matching xFusion structure
const PRODUCT_CATEGORIES = {
  'zh-cn': [
    {
      id: 'servers',
      title: '服务器',
      products: [
        {
          id: 1,
          title: '2288H V7',
          description: '机架服务器，适用于云计算、虚拟化、高性能计算、数据库等场景',
          image: '/content/images/products/rack-server.png',
          link: '/cn/products/servers/2288h-v7',
        },
        {
          id: 2,
          title: 'FusionServer G5200 V7',
          description: 'AI服务器，为AI训练、AI推理、HPC、图片视频分析等应用加速',
          image: '/content/images/products/ai-server.png',
          link: '/cn/products/servers/g5200-v7',
        },
        {
          id: 3,
          title: 'FusionPoD',
          description: '整机柜液冷服务器，商用液冷新标杆，高密算力新旗舰',
          image: '/content/images/products/rack-scale-server.png',
          link: '/cn/products/servers/fusionpod',
        },
      ],
    },
    {
      id: 'ai-engine',
      title: '大模型加速引擎',
      products: [
        {
          id: 4,
          title: 'AI加速引擎',
          description: '大模型训练与推理加速，释放AI算力潜能',
          image: '/content/images/icons/ai-engine.svg',
          link: '/cn/products/ai-engine',
        },
      ],
    },
    {
      id: 'hci',
      title: '超融合解决方案',
      products: [
        {
          id: 5,
          title: 'FusionOne HCI',
          description: '极简、智能、可靠的超融合基础设施',
          image: '/content/images/icons/hci-solution.svg',
          link: '/cn/products/hci',
        },
      ],
    },
    {
      id: 'hpc',
      title: '高性能计算解决方案',
      products: [
        {
          id: 6,
          title: 'HPC解决方案',
          description: '全栈HPC解决方案，助力科学研究与工程创新',
          image: '/content/images/icons/hpc-solution.svg',
          link: '/cn/products/hpc',
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
          title: '2288H V7',
          description: 'Rack server for cloud, virtualization, HPC, database workloads',
          image: '/content/images/products/rack-server.png',
          link: '/en/products/servers/2288h-v7',
        },
        {
          id: 2,
          title: 'FusionServer G5200 V7',
          description: 'AI server for AI training, inference, HPC, and video analytics',
          image: '/content/images/products/ai-server.png',
          link: '/en/products/servers/g5200-v7',
        },
        {
          id: 3,
          title: 'FusionPoD',
          description: 'Rack-scale liquid-cooled server, commercial liquid cooling benchmark',
          image: '/content/images/products/rack-scale-server.png',
          link: '/en/products/servers/fusionpod',
        },
      ],
    },
    {
      id: 'ai-engine',
      title: 'AI Engine',
      products: [
        {
          id: 4,
          title: 'AI Acceleration Engine',
          description: 'LLM training and inference acceleration',
          image: '/content/images/icons/ai-engine.svg',
          link: '/en/products/ai-engine',
        },
      ],
    },
    {
      id: 'hci',
      title: 'HCI Solutions',
      products: [
        {
          id: 5,
          title: 'FusionOne HCI',
          description: 'Simple, intelligent, reliable HCI infrastructure',
          image: '/content/images/icons/hci-solution.svg',
          link: '/en/products/hci',
        },
      ],
    },
    {
      id: 'hpc',
      title: 'HPC Solutions',
      products: [
        {
          id: 6,
          title: 'HPC Solution',
          description: 'Full-stack HPC solutions for scientific research',
          image: '/content/images/icons/hpc-solution.svg',
          link: '/en/products/hpc',
        },
      ],
    },
  ],
};

// Solutions data matching xFusion structure
const SOLUTIONS = {
  'zh-cn': [
    {
      id: 1,
      title: '城企数智解决方案',
      description: '企业数智化平台、核心水平商业应用与智能体、业务变革与业务设计咨询',
      icon: '/content/images/icons/hci-solution.svg',
      link: '/cn/solutions/digital',
    },
    {
      id: 2,
      title: '算力产品与解决方案',
      description: '云、边、智融合的全栈算力解决方案产品与服务',
      icon: '/content/images/icons/server.svg',
      link: '/cn/solutions/computing',
    },
    {
      id: 3,
      title: '能源智慧解决方案',
      description: '全系列产品，全场景补能',
      icon: '/content/images/icons/hpc-solution.svg',
      link: '/cn/solutions/energy',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Enterprise Digital Solutions',
      description: 'Enterprise digital platforms, business applications, AI agents',
      icon: '/content/images/icons/hci-solution.svg',
      link: '/en/solutions/digital',
    },
    {
      id: 2,
      title: 'Computing Solutions',
      description: 'Cloud-edge-AI integrated full-stack computing solutions',
      icon: '/content/images/icons/server.svg',
      link: '/en/solutions/computing',
    },
    {
      id: 3,
      title: 'Energy Solutions',
      description: 'Full product lineup for all charging scenarios',
      icon: '/content/images/icons/hpc-solution.svg',
      link: '/en/solutions/energy',
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
                image={product.image}
                link={product.link}
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
                link={solution.link}
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
