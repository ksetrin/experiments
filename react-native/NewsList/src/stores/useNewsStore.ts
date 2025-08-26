import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { NewsStore, NewsCategory } from '../types/news.types';
import { newsApiService } from '../services/newsApi';

const initialState = {
  news: [],
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
  query: '',
  category: '' as NewsCategory,
  totalResults: 0,
};

export const useNewsStore = create<NewsStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,

      fetchNews: async () => {
        const { isLoading } = get();
        if (isLoading) return;

        set(state => {
          state.isLoading = true;
          state.error = null;
          state.page = 1;
          state.news = [];
          state.hasMore = true;
        });

        try {
          const { query, category } = get();
          const response = await newsApiService.getNews(1, query, category);

          set(state => {
            state.news = response.articles;
            state.hasMore = response.hasMore;
            state.page = 2;
            state.totalResults = response.totalResults;
          });
        } catch (error) {
          set(state => {
            state.error = error instanceof Error ? error.message : 'Ошибка загрузки новостей';
            state.hasMore = false;
          });
        } finally {
          set(state => {
            state.isLoading = false;
          });
        }
      },

      loadMore: async () => {
        const { isLoading, hasMore, page, query, category, news } = get();

        if (isLoading || !hasMore) {
          console.log('Load more cancelled - isLoading:', isLoading, 'hasMore:', hasMore);
          return;
        }

        set(state => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const response = await newsApiService.getNews(page, query, category);

          set(state => {
            const newArticles = response.articles.filter(
              newArticle => !news.some(existingArticle => existingArticle.id === newArticle.id)
            );

            state.news.push(...newArticles);
            state.hasMore = response.hasMore;
            state.page = page + 1;
            state.totalResults = response.totalResults;

            console.log('Load more completed - new articles:', newArticles.length, 'total articles:', state.news.length);
          });
        } catch (error) {
          set(state => {
            state.error = error instanceof Error ? error.message : 'Ошибка загрузки новостей';
            state.hasMore = false;
          });
        } finally {
          set(state => {
            state.isLoading = false;
          });
        }
      },

      searchNews: async (query: string) => {
        set(state => {
          state.query = query.trim();
        });

        await get().fetchNews();
      },

      filterByCategory: async (category: NewsCategory) => {
        set(state => {
          state.category = category;
        });

        await get().fetchNews();
      },

      clearFilters: async () => {
        set(state => {
          state.query = '';
          state.category = '' as NewsCategory;
        });

        await get().fetchNews();
      },

      reset: () => {
        set(() => ({ ...initialState }));
      },
    })),
    {
      name: 'news-store',
    },
  ),
);
