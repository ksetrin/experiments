import { CategoryOption } from '../types/news.types';

export const NEWS_CATEGORIES: CategoryOption[] = [
  { value: '', label: 'Все' },
  { value: 'technology', label: 'Технологии' },
  { value: 'sports', label: 'Спорт' },
  { value: 'politics', label: 'Политика' },
  { value: 'business', label: 'Бизнес' },
  { value: 'health', label: 'Здоровье' },
  { value: 'science', label: 'Наука' },
  { value: 'entertainment', label: 'Развлечения' },
];

export const DEFAULT_SEARCH_PLACEHOLDER = 'Поиск новостей...';
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_RESULTS_LIMIT = 100;
