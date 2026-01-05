/**
 * Product Card Component
 */

import React from 'react';
import * as styles from './ProductCard.module.css';

export interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  locale?: 'zh-cn' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, description, image, link }) => {
  const cardContent = (
    <>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
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

export default ProductCard;
