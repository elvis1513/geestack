/**
 * Product Card Component
 */

import React from 'react';
import * as styles from './ProductCard.module.css';

export interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  locale?: 'zh-cn' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, description, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ background: image }} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
