/**
 * Category Navigation
 */

import React from 'react';
import * as styles from './products.module.css';

export interface Category {
  id: string;
  title: string;
}

export interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  locale?: 'zh-cn' | 'en';
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav className={styles.categoryNav} aria-label="Product categories">
      <div className={styles.categoryNavContainer}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => onCategoryChange(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            {category.title}
          </button>
        ))}
      </div>
    </nav>
  );
};
