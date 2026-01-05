/**
 * Solution Card Component
 */

import React from 'react';
import * as styles from './SolutionCard.module.css';

export interface SolutionCardProps {
  title: string;
  description: string;
  icon: string;
  link?: string;
  locale?: 'zh-cn' | 'en';
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ title, description, icon, link }) => {
  const cardContent = (
    <>
      <div className={styles.iconWrapper}>
        <img src={icon} alt={title} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
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

export default SolutionCard;
