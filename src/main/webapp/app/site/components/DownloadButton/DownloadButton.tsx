/**
 * Download Button Component
 */

import React from 'react';
import * as styles from './DownloadButton.module.css';

export interface DownloadButtonProps {
  locale?: 'zh-cn' | 'en';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ locale = 'zh-cn' }) => {
  const label = locale === 'zh-cn' ? '下载' : 'Download';

  return (
    <button className={styles.button} aria-label={label}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 3L8 9M8 9L5 6M8 9L11 6M8 9V1M3 13H13M11 13H13C14.1046 13 15 12.1046 15 11C15 9.89543 14.1046 9 13 9H5C3.89543 9 3 9.89543 3 11C3 12.1046 3.89543 13 5 13H7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
};

export default DownloadButton;
