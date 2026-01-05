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
      title: '超聚变亮相2025集团企业数智化技术创新与生态大会，共探业务变革与AI落地实践',
      date: '2025-12-30',
      summary: '超聚变受邀参加2025集团企业数智化技术创新与生态大会，与行业专家共同探讨业务变革与AI落地实践',
      link: '/cn/news/innovation-eco-conference',
      image: '/content/images/news/news-innovation-conference.jpg',
    },
    {
      id: 2,
      title: '超聚变获评中国软件高质量发展百强企业',
      date: '2025-11-17',
      summary: '凭借在软件领域的创新能力和高质量发展成果，超聚变荣获中国软件高质量发展百强企业称号',
      link: '/cn/news/top100-award',
      image: '/content/images/news/news-top100.jpg',
    },
    {
      id: 3,
      title: '超聚变携手超图软件：以一体化行业落地解决方案赋能GIS智能化转型',
      date: '2025-12-26',
      summary: '超聚变与超图软件达成战略合作，共同打造一体化行业解决方案，推动GIS智能化转型',
      link: '/cn/news/supermap-partnership',
      image: '/content/images/news/news-supermap.jpg',
    },
  ],
  en: [
    {
      id: 1,
      title: 'xFusion at 2025 Enterprise Digital Innovation Conference',
      date: '2025-12-30',
      summary:
        'xFusion participated in the 2025 Enterprise Digital Innovation Conference to explore business transformation and AI implementation',
      link: '/en/news/innovation-eco-conference',
      image: '/content/images/news/news-innovation-conference.jpg',
    },
    {
      id: 2,
      title: 'xFusion Named Top 100 High-Quality Software Enterprise in China',
      date: '2025-11-17',
      summary:
        'xFusion was recognized as a Top 100 High-Quality Software Enterprise for its innovation and excellence in software development',
      link: '/en/news/top100-award',
      image: '/content/images/news/news-top100.jpg',
    },
    {
      id: 3,
      title: 'xFusion Partners with SuperMap to Enable GIS Intelligence',
      date: '2025-12-26',
      summary:
        'xFusion and SuperMap formed a strategic partnership to deliver integrated industry solutions for GIS intelligent transformation',
      link: '/en/news/supermap-partnership',
      image: '/content/images/news/news-supermap.jpg',
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
            <div className={styles.image} style={{ backgroundImage: `url(${item.image})` }} />
            <div className={styles.content}>
              <span className={styles.date}>{item.date}</span>
              <h3 className={styles.newsTitle}>{item.title}</h3>
              <p className={styles.newsSummary}>{item.summary}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
