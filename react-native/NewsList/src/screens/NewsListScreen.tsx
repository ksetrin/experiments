import React, { useEffect, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNews } from '../hooks/useNews';
import { NewsCard } from '../components/NewsCard';
import { NewsCardSkeleton } from '../components/NewsCardSkeleton';
import { NewsItem, NewsCategory } from '../types/news.types';
import { NewsListStack } from '../types/navigation';
import { Container, ErrorContainer, ErrorText, LoadingContainer } from '../components/ui';
import { SearchBar } from '../components/SearchBar.tsx';
import { CategoryFilter } from '../components/CategoryFilter.tsx';

type NewsListScreenNavigationProp = NativeStackNavigationProp<NewsListStack, 'NewsListScreen'>;

interface NewsListScreenProps {
  navigation: NewsListScreenNavigationProp;
}

const NewsListScreen: React.FC<NewsListScreenProps> = ({ navigation }) => {
  const { news, isLoading, error, hasMore, query, category, actions } = useNews();

  useEffect(() => {
    actions.fetchNews();
  }, []);

  const handleNewsPress = useCallback((newsItem: NewsItem) => {
    navigation.navigate('NewsListItemScreen', { newsItem });
  }, [navigation]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading && news.length > 0) {
      actions.loadMore();
    }
  }, [hasMore, isLoading, news.length, actions]);

  const handleSearch = useCallback((searchQuery: string) => {
    actions.searchNews(searchQuery);
  }, [actions]);

  const handleCategorySelect = useCallback((selectedCategory: NewsCategory) => {
    actions.filterByCategory(selectedCategory);
  }, [actions]);

  const handleClearFilters = useCallback(() => {
    actions.clearFilters();
  }, [actions]);

  const handleRefresh = useCallback(() => {
    actions.fetchNews();
  }, [actions]);

  const renderNewsItem = useCallback(({ item }: { item: NewsItem }) => (
    <NewsCard news={item} onPress={handleNewsPress} />
  ), [handleNewsPress]);

  const renderHeader = useCallback(() => (
    <View>
      <SearchBar
        onSearch={handleSearch}
        initialValue={query}
        placeholder="Поиск новостей..."
      />
      <CategoryFilter
        selectedCategory={category}
        query={query}
        onCategorySelect={handleCategorySelect}
        onClearFilters={handleClearFilters}
      />
    </View>
  ), [query, category, handleSearch, handleCategorySelect, handleClearFilters]);

  const renderFooter = useCallback(() => {
    if (!isLoading || news.length === 0) return null;

    return (
      <LoadingContainer>
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </LoadingContainer>
    );
  }, [isLoading, news.length]);

  const keyExtractor = useCallback((item: NewsItem) => item.id, []);

  if (error && news.length === 0) {
    return (
      <Container>
        {renderHeader()}
        <ErrorContainer>
          <ErrorText>Ошибка: {error}</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshing={isLoading && news.length === 0}
        onRefresh={handleRefresh}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        getItemLayout={undefined}
      />
    </Container>
  );
};

export default NewsListScreen;
