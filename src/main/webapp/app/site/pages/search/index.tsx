/**
 * SearchPage - Full search results page with pagination
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './SearchPage.module.css';
import type { SearchPageState, SearchRequest } from '../../types/search';

const PAGE_SIZE = 10;

const translations = {
  'zh-cn': {
    search: '搜索',
    products: '产品与解决方案',
    resources: '资料中心',
    cases: '案例中心',
    results: '个结果',
    noResults: '未找到相关结果',
    loading: '加载中...',
    error: '出错了',
    retry: '重试',
    previous: '上一页',
    next: '下一页',
  },
  en: {
    search: 'Search',
    products: 'Products & Solutions',
    resources: 'Resources',
    cases: 'Cases',
    results: 'results',
    noResults: 'No results found',
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    previous: 'Previous',
    next: 'Next',
  },
};

interface SearchPageProps {
  locale: 'zh-cn' | 'en';
}

export const SearchPage: React.FC<SearchPageProps> = ({ locale }) => {
  const t = translations[locale];
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParam = searchParams.get('q') || '';
  const pageParam = parseInt(searchParams.get('page') || '0', 10);

  const [state, setState] = useState<SearchPageState>({
    query: queryParam,
    results: [],
    loading: true,
    error: null,
    pagination: {
      page: pageParam,
      size: PAGE_SIZE,
      totalElements: 0,
      totalPages: 0,
    },
  });

  // Perform search when query or page changes
  useEffect(() => {
    const performSearch = async () => {
      if (!queryParam.trim()) {
        setState(prev => ({
          ...prev,
          loading: false,
          results: [],
          error: null,
        }));
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const request: SearchRequest = {
          lang: locale,
          q: queryParam,
          page: pageParam,
          size: PAGE_SIZE,
        };

        const response = await fetch(`/api/site/search?${new URLSearchParams(request as any)}`);

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data = await response.json();

        setState({
          query: queryParam,
          results: data.items || [],
          loading: false,
          error: null,
          pagination: data.page || {
            page: pageParam,
            size: PAGE_SIZE,
            totalElements: 0,
            totalPages: 0,
          },
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : t.error,
        }));
      }
    };

    performSearch();
  }, [queryParam, pageParam, locale, t]);

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams({ q: queryParam, page: newPage.toString() });
    navigate(`?${params.toString()}`);
  };

  // Group results by type
  const groupedResults = state.results.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, typeof state.results>,
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {t.search}: {queryParam}
        </h1>
        <p className={styles.subtitle}>
          {state.pagination.totalElements > 0 ? `${t.search}: ${state.pagination.totalElements} ${t.results}` : t.noResults}
        </p>
      </div>

      {state.loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} aria-hidden="true" />
          <p>{t.loading}</p>
        </div>
      )}

      {state.error && (
        <div className={styles.error}>
          <p>{state.error}</p>
          <button onClick={() => window.location.reload()}>{t.retry}</button>
        </div>
      )}

      {!state.loading && !state.error && state.results.length === 0 && queryParam && (
        <div className={styles.empty}>
          <p>{t.noResults}</p>
        </div>
      )}

      {!state.loading && !state.error && state.results.length > 0 && (
        <>
          <div className={styles.results}>
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type} className={styles.group}>
                <h2 className={styles.groupTitle}>
                  {type === 'product' && t.products}
                  {type === 'resource' && t.resources}
                  {type === 'case' && t.cases}
                  <span className={styles.count}>({items.length})</span>
                </h2>
                <div className={styles.items}>
                  {items.map(item => (
                    <div key={item.id} className={styles.item}>
                      {item.thumbnail && <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} loading="lazy" />}
                      <div className={styles.content}>
                        <h3 className={styles.itemTitle}>
                          <a href={item.url}>{item.title}</a>
                        </h3>
                        {item.category && <span className={styles.category}>{item.category}</span>}
                        <p className={styles.summary}>{item.summary}</p>
                        {item.tags && item.tags.length > 0 && (
                          <div className={styles.tags}>
                            {item.tags.map(tag => (
                              <span key={tag} className={styles.tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {state.pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(state.pagination.page - 1)}
                disabled={state.pagination.page === 0}
                className={styles.paginationButton}
              >
                {t.previous}
              </button>
              <span className={styles.paginationInfo}>
                {state.pagination.page + 1} / {state.pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(state.pagination.page + 1)}
                disabled={state.pagination.page >= state.pagination.totalPages - 1}
                className={styles.paginationButton}
              >
                {t.next}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
