/**
 * Search feature type definitions
 */

export type SearchResultType = 'product' | 'resource' | 'case';

/**
 * Single search result item
 */
export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  summary: string;
  url: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
}

/**
 * Pagination information
 */
export interface SearchPagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

/**
 * Search response from API
 */
export interface SearchResponse {
  lang: string;
  query: string;
  items: SearchResultItem[];
  page: SearchPagination;
}

/**
 * Search request parameters
 */
export interface SearchRequest {
  lang: string;
  q: string;
  page?: number;
  size?: number;
}

/**
 * Search history item (stored in localStorage)
 */
export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

/**
 * Search modal props
 */
export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: 'zh-cn' | 'en';
}

/**
 * Search page state
 */
export interface SearchPageState {
  query: string;
  results: SearchResultItem[];
  loading: boolean;
  error: string | null;
  pagination: SearchPagination;
}
