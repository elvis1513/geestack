/**
 * Resource Card Component
 */

import React from 'react';
import { DownloadButton } from '../DownloadButton';
import * as styles from './ResourceCard.module.css';

export interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  size: string;
  date: string;
  gradient: string;
  locale?: 'zh-cn' | 'en';
}

const RESOURCE_TYPE_LABELS = {
  'zh-cn': {
    whitepaper: '白皮书',
    technical: '技术文档',
    case: '案例研究',
    video: '视频教程',
  },
  en: {
    whitepaper: 'Whitepaper',
    technical: 'Technical',
    case: 'Case Study',
    video: 'Video',
  },
};

const RESOURCE_TYPE_COLORS = {
  whitepaper: '#1890FF',
  technical: '#52C41A',
  case: '#F70000',
  video: '#722ED1',
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, type, size, date, gradient, locale = 'zh-cn' }) => {
  const typeLabel = RESOURCE_TYPE_LABELS[locale][type as keyof typeof RESOURCE_TYPE_LABELS] || type;
  const typeColor = RESOURCE_TYPE_COLORS[type as keyof typeof RESOURCE_TYPE_COLORS] || '#999';

  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ background: gradient }} />
      <div className={styles.content}>
        <span className={styles.type} style={{ color: typeColor }}>
          {typeLabel}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <span className={styles.size}>{size}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <DownloadButton locale={locale} />
      </div>
    </div>
  );
};

export default ResourceCard;
