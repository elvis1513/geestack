/**
 * Case Card Component
 */

import React from 'react';
import * as styles from './CaseCard.module.css';

export interface CaseCardProps {
  customer: string;
  title: string;
  description: string;
  industry: string;
  image: string;
  link?: string;
  locale?: 'zh-cn' | 'en';
}

const INDUSTRY_LABELS: Record<'zh-cn' | 'en', Record<string, string>> = {
  'zh-cn': {
    finance: '金融',
    government: '政府',
    manufacturing: '制造',
    education: '教育',
    healthcare: '医疗',
    energy: '能源',
  },
  en: {
    finance: 'Finance',
    government: 'Government',
    manufacturing: 'Manufacturing',
    education: 'Education',
    healthcare: 'Healthcare',
    energy: 'Energy',
  },
};

const INDUSTRY_COLORS: Record<string, string> = {
  finance: '#1890FF',
  government: '#52C41A',
  manufacturing: '#FA8C16',
  education: '#722ED1',
  healthcare: '#F70000',
  energy: '#13C2C2',
};

export const CaseCard: React.FC<CaseCardProps> = ({ customer, title, description, industry, image, link, locale = 'zh-cn' }) => {
  const industryLabel = INDUSTRY_LABELS[locale][industry];
  const industryColor = INDUSTRY_COLORS[industry];

  const cardContent = (
    <>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
      <div className={styles.content}>
        <span className={styles.industry} style={{ color: industryColor }}>
          {industryLabel}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.customer}>{customer}</p>
        <p className={styles.description}>{description}</p>
        <button className={styles.detailsButton} aria-label="View case details">
          {locale === 'zh-cn' ? '查看详情' : 'View Details'} →
        </button>
      </div>
    </>
  );

  if (link) {
    return (
      <a href={link} className={styles.cardLink}>
        {cardContent}
      </a>
    );
  }

  return <div className={styles.card}>{cardContent}</div>;
};

export default CaseCard;
