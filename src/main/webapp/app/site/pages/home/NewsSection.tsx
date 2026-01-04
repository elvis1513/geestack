/**
 * News Section
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - 3 columns grid
 * - News cards
 */

import React from 'react';
import * as styles from './NewsSection.module.css';

export interface NewsSectionProps {
  locale?: 'zh-cn' | 'en';
}

const NEWS_ITEMS = {
  'zh-cn': [
    {
      id: 1,
      title: 'GeeStack发布企业数智化转型白皮书',
      date: '2025-01-03',
      summary: '深度解析企业数智化转型路径，分享GeeStack在全栈算力解决方案领域的最佳实践',
      link: '/cn/news/whitepaper-2025',
    },
    {
      id: 2,
      title: 'GeeStack xERP 3.0正式发布，助力企业核心管理升级',
      date: '2024-12-28',
      summary: '全新一代企业核心经营管理系统，融入AI智能体，提升企业运营效率',
      link: '/cn/news/xerp-3.0',
    },
    {
      id: 3,
      title: 'GeeStack智算中心解决方案斩获行业大奖',
      date: '2024-12-20',
      summary: '凭借创新的云边智融合架构和卓越的AI算力调度能力获得认可',
      link: '/cn/news/award-2024',
    },
  ],
  en: [
    {
      id: 1,
      title: 'GeeStack Releases Enterprise Digital Transformation Whitepaper',
      date: '2025-01-03',
      summary: 'In-depth analysis of enterprise transformation paths, sharing best practices in full-stack computing solutions',
      link: '/en/news/whitepaper-2025',
    },
    {
      id: 2,
      title: 'GeeStack xERP 3.0 Official Launch, Upgrading Core Enterprise Management',
      date: '2024-12-28',
      summary: 'Next-generation enterprise core management system with integrated AI agents for improved operational efficiency',
      link: '/en/news/xerp-3.0',
    },
    {
      id: 3,
      title: 'GeeStack Intelligent Computing Center Solution Wins Industry Award',
      date: '2024-12-20',
      summary: 'Recognized for innovative cloud-edge-AI fusion architecture and exceptional AI computing scheduling capabilities',
      link: '/en/news/award-2024',
    },
  ],
};

export const NewsSection: React.FC<NewsSectionProps> = ({ locale = 'zh-cn' }) => {
  const news = NEWS_ITEMS[locale];
  const sectionTitle = locale === 'zh-cn' ? '最新资讯' : 'Latest News';
  const viewAllText = locale === 'zh-cn' ? '查看更多' : 'View More';

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        <a href={locale === 'zh-cn' ? '/cn/news' : '/en/news'} className={styles.viewAll}>
          {viewAllText} →
        </a>
      </div>
      <div className={styles.grid}>
        {news.map(item => (
          <a key={item.id} href={item.link} className={styles.newsCard}>
            <span className={styles.date}>{item.date}</span>
            <h3 className={styles.newsTitle}>{item.title}</h3>
            <p className={styles.newsSummary}>{item.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
};
