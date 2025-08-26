import api from '../api/axiosConfig';
import { NewsResponse, NewsItem, NewsApiResponse, TopHeadlinesParams, EverythingParams, NewsCategory } from '../types/news.types';

const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200?text=No+Image';

class NewsApiService {
  private readonly pageSize = 10;

  async getFullNewsItem(newsItem: NewsItem): Promise<NewsItem> {
    try {
      const { data } = await api.get<NewsApiResponse>('/everything', {
        params: {
          q: `"${newsItem.title}"`,
          pageSize: 1,
          sortBy: 'relevancy',
        },
      });

      if (data.articles && data.articles.length > 0) {
        const fullArticle = data.articles[0];
        return {
          ...newsItem,
          content: fullArticle.content || fullArticle.description || newsItem.content,
          description: fullArticle.description || newsItem.description,
          author: fullArticle.author || newsItem.author,
          url: fullArticle.url || newsItem.url,
        };
      }
    } catch (error) {
      console.warn('Failed to fetch full article:', error);
    }

    return newsItem;
  }

  async getNews(page: number, query?: string, category?: NewsCategory): Promise<NewsResponse> {
    const hasQuery = query && query.trim().length > 0;
    const hasCategory = category && category.length > 0;

    if (hasQuery || hasCategory) {
      return this.getEverythingNews(page, query, category);
    } else {
      return this.getTopHeadlines(page);
    }
  }

  private async getTopHeadlines(page: number): Promise<NewsResponse> {
    const params = this.buildTopHeadlinesParams(page);
    const { data } = await api.get<NewsApiResponse>('/top-headlines', { params });

    const currentOffset = (page - 1) * this.pageSize;
    const hasMore = currentOffset + data.articles.length < Math.min(data.totalResults, 100);


    return {
      totalResults: data.totalResults,
      articles: data.articles.map(this.normalizeNewsItem),
      hasMore,
      currentPage: page,
    };
  }

  private async getEverythingNews(page: number, query?: string, category?: NewsCategory): Promise<NewsResponse> {
    const searchQuery = this.buildSearchQuery(query, category);
    const params = this.buildEverythingParams(page, searchQuery);
    const { data } = await api.get<NewsApiResponse>('/everything', { params });

    const currentOffset = (page - 1) * this.pageSize;
    const hasMore = currentOffset + data.articles.length < Math.min(data.totalResults, 100);

    return {
      totalResults: data.totalResults,
      articles: data.articles.map(this.normalizeNewsItem),
      hasMore,
      currentPage: page,
    };
  }

  private buildSearchQuery(query?: string, category?: NewsCategory): string {
    const parts: string[] = [];

    if (query && query.trim().length > 0) {
      parts.push(query.trim());
    }

    if (category && category.length > 0) {
      parts.push(category);
    }

    return parts.join(' AND ');
  }

  private buildTopHeadlinesParams(page: number): TopHeadlinesParams {
    return {
      page,
      pageSize: this.pageSize,
      country: 'us',
    };
  }

  private buildEverythingParams(page: number, query: string): EverythingParams {
    return {
      page,
      pageSize: this.pageSize,
      q: query,
      sortBy: 'publishedAt',
    };
  }

  private normalizeNewsItem = (item: any): NewsItem => ({
    id: item.url || `${item.title}-${Date.now()}-${Math.random()}`,
    title: item.title || 'Untitled',
    source: item.source?.name || 'Unknown Source',
    publishedAt: item.publishedAt || new Date().toISOString(),
    imageUrl: item.urlToImage || DEFAULT_IMAGE,
    content: item.content || item.description || '',
    description: item.description || '',
    author: item.author || '',
    url: item.url || '',
  });
}

export const newsApiService = new NewsApiService();
