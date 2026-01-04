/**
 * useSearch - Custom hook for search functionality
 */

import { useState, useCallback, useRef } from 'react';
import type { SearchResultItem, SearchHistoryItem } from '../types/search';

const SEARCH_HISTORY_KEY = 'search-history';
const MAX_HISTORY_ITEMS = 5;
const DEBOUNCE_MS = 300;

interface UseSearchParams {
  locale: 'zh-cn' | 'en';
}

interface UseSearchReturn {
  query: string;
  results: SearchResultItem[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  addToHistory: (query: string) => void;
  getHistory: () => SearchHistoryItem[];
  clearHistory: () => void;
}

export const useSearch = ({ locale }: UseSearchParams): UseSearchReturn => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getHistory = useCallback((): SearchHistoryItem[] => {
    const stored = localStorage.getItem(`${SEARCH_HISTORY_KEY}-${locale}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse search history:', e);
        return [];
      }
    }
    return [];
  }, [locale]);

  const addToHistory = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      const history = getHistory();
      const newItem: SearchHistoryItem = {
        query: searchQuery.trim(),
        timestamp: Date.now(),
      };

      const updatedHistory = [newItem, ...history.filter(h => h.query !== newItem.query)].slice(0, MAX_HISTORY_ITEMS);

      localStorage.setItem(`${SEARCH_HISTORY_KEY}-${locale}`, JSON.stringify(updatedHistory));
    },
    [getHistory, locale],
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem(`${SEARCH_HISTORY_KEY}-${locale}`);
  }, [locale]);

  const search = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setQuery('');
        setResults([]);
        setError(null);
        return;
      }

      setQuery(searchQuery);
      setLoading(true);
      setError(null);

      // Clear any pending debounced search
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Debounce the search request
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const params = new URLSearchParams({
            lang: locale,
            q: searchQuery,
            size: '10',
          });

          const response = await fetch(`/api/site/search?${params}`);

          if (!response.ok) {
            throw new Error(`Search failed: ${response.statusText}`);
          }

          const data = await response.json();

          setResults(data.items || []);
          setError(null);
        } catch (err) {
          console.error('Search error:', err);
          setError(err instanceof Error ? err.message : 'Search failed');
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, DEBOUNCE_MS);
    },
    [locale],
  );

  return {
    query,
    results,
    loading,
    error,
    search,
    addToHistory,
    getHistory,
    clearHistory,
  };
};
