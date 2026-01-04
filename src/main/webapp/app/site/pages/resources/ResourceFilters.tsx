/**
 * Resource Filters Component
 */

import React from 'react';
import * as styles from './resources.module.css';

export interface ResourceType {
  id: string;
  label: string;
}

export interface ResourceFiltersProps {
  resourceTypes: ResourceType[];
  activeType: string;
  onTypeChange: (id: string) => void;
  locale?: 'zh-cn' | 'en';
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({ resourceTypes, activeType, onTypeChange }) => {
  return (
    <nav className={styles.filters} aria-label="Resource filters">
      <div className={styles.filtersContainer}>
        {resourceTypes.map(type => (
          <button
            key={type.id}
            className={`${styles.filterButton} ${activeType === type.id ? styles.active : ''}`}
            onClick={() => onTypeChange(type.id)}
            aria-pressed={activeType === type.id}
          >
            {type.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
