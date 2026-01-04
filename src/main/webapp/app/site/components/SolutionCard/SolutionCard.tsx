/**
 * Solution Card Component
 */

import React from 'react';
import * as styles from './SolutionCard.module.css';

export interface SolutionCardProps {
  title: string;
  description: string;
  icon: string;
  locale?: 'zh-cn' | 'en';
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ title, description, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default SolutionCard;
