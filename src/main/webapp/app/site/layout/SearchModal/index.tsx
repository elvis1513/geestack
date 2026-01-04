/**
 * SearchModal - Quick search overlay with keyboard shortcuts
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchModal.module.css';
import type { SearchModalProps, SearchHistoryItem } from '../../types/search';

const SEARCH_HISTORY_KEY = 'search-history';
const MAX_HISTORY_ITEMS = 5;

const translations = {
  'zh-cn': {
    search: '搜索',
    close: '关闭',
    searchPlaceholder: '搜索产品、资料、案例...',
    recentSearches: '最近搜索',
    clear: '清空',
  },
  en: {
    search: 'Search',
    close: 'Close',
    searchPlaceholder: 'Search products, resources, cases...',
    recentSearches: 'Recent Searches',
    clear: 'Clear',
  },
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, locale }) => {
  const t = translations[locale];
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage
  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem(`${SEARCH_HISTORY_KEY}-${locale}`);
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse search history:', e);
        }
      }
    }
  }, [isOpen, locale]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Add to search history
  const addToHistory = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      const newItem: SearchHistoryItem = {
        query: searchQuery.trim(),
        timestamp: Date.now(),
      };

      const updatedHistory = [newItem, ...history.filter(h => h.query !== newItem.query)].slice(0, MAX_HISTORY_ITEMS);

      setHistory(updatedHistory);
      localStorage.setItem(`${SEARCH_HISTORY_KEY}-${locale}`, JSON.stringify(updatedHistory));
    },
    [history, locale],
  );

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    addToHistory(query);

    // Navigate to search results page
    const searchPath = locale === 'zh-cn' ? '/cn/search' : '/en/search';
    const params = new URLSearchParams({ q: query });
    navigate(`${searchPath}?${params.toString()}`);

    onClose();
    setQuery('');
  };

  // Handle history item click
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Clear input
  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <h2 id="search-modal-title" className={styles.title}>
            {t.search}
          </h2>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label={t.close}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <svg
              className={styles.searchIcon}
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.search}
            />
            {query && (
              <button type="button" className={styles.clearButton} onClick={handleClear} aria-label="Clear search">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={!query.trim()}>
            {t.search}
          </button>
        </form>

        {history.length > 0 && (
          <div className={styles.history}>
            <h3 className={styles.historyTitle}>{t.recentSearches}</h3>
            <ul className={styles.historyList}>
              {history.map(item => (
                <li key={item.timestamp}>
                  <button type="button" className={styles.historyButton} onClick={() => handleHistoryClick(item.query)}>
                    <svg
                      className={styles.historyIcon}
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{item.query}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.footer}>
          <kbd className={styles.kbd}>⌘</kbd>
          <span className={styles.kbdText}>+</span>
          <kbd className={styles.kbd}>K</kbd>
          <span className={styles.kbdHint}>to open</span>
        </div>
      </div>
    </div>
  );
};
