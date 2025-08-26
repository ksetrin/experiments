export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  content: string;
  description: string;
  author: string;
  url: string;
}

export interface NewsResponse {
  totalResults: number;
  articles: NewsItem[];
  hasMore: boolean;
  currentPage: number;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: any[];
}

export interface NewsStore {
  news: NewsItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  query: string;
  category: NewsCategory;
  totalResults: number;
  fetchNews: () => Promise<void>;
  loadMore: () => Promise<void>;
  searchNews: (query: string) => Promise<void>;
  filterByCategory: (category: NewsCategory) => Promise<void>;
  clearFilters: () => Promise<void>;
  reset: () => void;
}

export interface TopHeadlinesParams {
  page: number;
  pageSize: number;
  country?: string;
  category?: NewsCategory;
}

export interface EverythingParams {
  page: number;
  pageSize: number;
  q: string;
  sortBy: 'relevancy' | 'popularity' | 'publishedAt';
}

export type NewsCategory = '' | 'technology' | 'sports' | 'politics' | 'business' | 'health' | 'science' | 'entertainment';

export interface CategoryOption {
  value: NewsCategory;
  label: string;
}
