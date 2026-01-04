/**
 * Featured Section
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - 4 columns grid
 * - Cards with hover effects
 */

import React from 'react';
import * as styles from './FeaturedSection.module.css';

export interface FeaturedSectionProps {
  locale?: 'zh-cn' | 'en';
}

const FEATURED_ITEMS = {
  'zh-cn': [
    {
      id: 1,
      title: 'xERP 企业核心经营系统',
      description: '企业核心经营管理系统',
      icon: '💼',
      link: '/cn/products/xerp',
    },
    {
      id: 2,
      title: 'xIBT 业务变革与数智化转型专业服务',
      description: '业务变革与数智化转型专业服务',
      icon: '🔄',
      link: '/cn/products/xibt',
    },
    {
      id: 3,
      title: 'xRAY 智能数据&AI使能平台',
      description: '智能数据与AI使能平台',
      icon: '🤖',
      link: '/cn/products/xray',
    },
  ],
  en: [
    {
      id: 1,
      title: 'xERP Enterprise Core System',
      description: 'Enterprise core management system',
      icon: '💼',
      link: '/en/products/xerp',
    },
    {
      id: 2,
      title: 'xIBT Business Transformation Service',
      description: 'Business transformation & digital intelligence service',
      icon: '🔄',
      link: '/en/products/xibt',
    },
    {
      id: 3,
      title: 'xRAY Intelligent Data & AI Platform',
      description: 'Intelligent data and AI enabling platform',
      icon: '🤖',
      link: '/en/products/xray',
    },
  ],
};

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ locale = 'zh-cn' }) => {
  const items = FEATURED_ITEMS[locale];
  const sectionTitle = locale === 'zh-cn' ? '热门推荐' : 'Featured';
  const sectionDescription =
    locale === 'zh-cn'
      ? '企业数智化平台、核心水平商业应用与智能体、业务变革与业务设计咨询、数智化实施专业服务等AI和数据全栈解决方案'
      : 'Enterprise digital intelligence platforms, core business applications & AI agents, business transformation consulting, digital implementation services, and full-stack AI & data solutions';

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{sectionTitle}</h2>
      <p className={styles.description}>{sectionDescription}</p>
      <div className={styles.grid}>
        {items.map(item => (
          <a key={item.id} href={item.link} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};
