/**
 * Industry Filters Component
 */

import React from 'react';
import * as styles from './IndustryFilters.module.css';

export interface IndustryType {
  id: string;
  label: string;
}

export interface IndustryFiltersProps {
  industries: IndustryType[];
  activeIndustry: string;
  onIndustryChange: (industry: string) => void;
}

export const IndustryFilters: React.FC<IndustryFiltersProps> = ({ industries, activeIndustry, onIndustryChange }) => {
  return (
    <div className={styles.filters} aria-label="Filter by industry">
      {industries.map(industry => (
        <button
          key={industry.id}
          className={`${styles.filterButton} ${activeIndustry === industry.id ? styles.active : ''}`}
          onClick={() => onIndustryChange(industry.id)}
          aria-pressed={activeIndustry === industry.id}
        >
          {industry.label}
        </button>
      ))}
    </div>
  );
};

export default IndustryFilters;
