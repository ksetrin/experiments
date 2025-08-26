import { useNewsStore } from '../stores/useNewsStore';

export const useNews = () => {
  const {
    news,
    isLoading,
    error,
    hasMore,
    query,
    category,
    fetchNews,
    loadMore,
    searchNews,
    filterByCategory,
    clearFilters,
    reset,
  } = useNewsStore();

  return {
    news,
    isLoading,
    error,
    hasMore,
    query,
    category,
    actions: {
      fetchNews,
      loadMore,
      searchNews,
      filterByCategory,
      clearFilters,
      reset,
    },
  };
};
