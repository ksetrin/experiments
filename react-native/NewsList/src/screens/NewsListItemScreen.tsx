import React, { useState, useEffect } from 'react';
import { Alert, Linking, ImageErrorEventData, NativeSyntheticEvent, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { NewsListStack } from '../types/navigation';
import { NewsItem } from '../types/news.types';
import { newsApiService } from '../services/newsApi';
import { ImagePlaceholder, PlaceholderText, Container, ErrorContainer, ErrorText } from '../components/ui';
import {
  ScrollContainer,
  DetailImageContainer,
  DetailImage,
  DetailContent,
  DetailTitle,
  DetailMeta,
  DetailSource,
  DetailAuthor,
  DetailDate,
  DetailDescription,
  DetailText,
  ButtonContainer,
  ActionButton,
  ButtonText,
} from '../components/ui';

type NewsListItemScreenNavigationProp = NativeStackNavigationProp<NewsListStack, 'NewsListItemScreen'>;
type NewsListItemScreenRouteProp = RouteProp<NewsListStack, 'NewsListItemScreen'>;

interface NewsListItemScreenProps {
  navigation: NewsListItemScreenNavigationProp;
  route: NewsListItemScreenRouteProp;
}

const NewsListItemScreen: React.FC<NewsListItemScreenProps> = ({ navigation, route }) => {
  const { newsItem: initialNewsItem } = route.params;
  const [newsItem, setNewsItem] = useState<NewsItem>(initialNewsItem);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFullNews();
  }, []);

  const loadFullNews = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fullNewsItem = await newsApiService.getFullNewsItem(initialNewsItem);
      setNewsItem(fullNewsItem);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки новости');
      console.error('Error loading full news:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };

  const formatDetailDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Дата не указана';
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenInBrowser = async () => {
    if (!newsItem?.url) {
      Alert.alert('Ошибка', 'Ссылка на статью недоступна');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(newsItem.url);
      if (supported) {
        await Linking.openURL(newsItem.url);
      } else {
        Alert.alert('Ошибка', 'Не удалось открыть ссылку');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось открыть ссылку');
    }
  };

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>Ошибка загрузки: {error}</ErrorText>
          <ActionButton variant="primary" onPress={loadFullNews} style={{ marginTop: 20 }}>
            <ButtonText variant="primary">Повторить</ButtonText>
          </ActionButton>
        </ErrorContainer>
      </Container>
    );
  }

  return isLoading ? (
    <Container>
      <ErrorContainer>
        <ActivityIndicator size="large" color="#2563eb" />
        <DetailText style={{ marginTop: 16, textAlign: 'center' }}>Загружаем полную версию новости...</DetailText>
      </ErrorContainer>
    </Container>
  ) : (
    <ScrollContainer showsVerticalScrollIndicator={false}>
      <DetailImageContainer>
        <DetailImage
          source={{
            uri: imageError ? 'https://via.placeholder.com/400x250?text=No+Image' : newsItem.imageUrl,
          }}
          resizeMode="cover"
          onError={handleImageError}
        />
        {imageError && (
          <ImagePlaceholder>
            <PlaceholderText>📰</PlaceholderText>
          </ImagePlaceholder>
        )}
      </DetailImageContainer>

      <DetailContent>
        <DetailTitle>{newsItem.title}</DetailTitle>

        <DetailMeta>
          <DetailSource>{newsItem.source}</DetailSource>
          {newsItem.author && (
            <>
              <DetailText> • </DetailText>
              <DetailAuthor>{newsItem.author}</DetailAuthor>
            </>
          )}
        </DetailMeta>

        <DetailDate>{formatDetailDate(newsItem.publishedAt)}</DetailDate>

        {newsItem.description && <DetailDescription>{newsItem.description}</DetailDescription>}

        {newsItem.content && (
          <DetailText>
            {newsItem.content.replace(/\[.*?\]/g, '').trim() || 'Полный текст статьи доступен на сайте источника.'}
          </DetailText>
        )}

        <ButtonContainer>
          <ActionButton variant="secondary" onPress={handleGoBack}>
            <ButtonText variant="secondary">Назад</ButtonText>
          </ActionButton>

          {newsItem.url && (
            <ActionButton variant="primary" onPress={handleOpenInBrowser}>
              <ButtonText variant="primary">Открыть в браузере</ButtonText>
            </ActionButton>
          )}
        </ButtonContainer>
      </DetailContent>
    </ScrollContainer>
  );
};

export default NewsListItemScreen;
