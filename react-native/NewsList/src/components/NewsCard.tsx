import React, { useState } from 'react';
import { ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import { NewsItem } from '../types/news.types';
import {
  CardContainer,
  ContentContainer,
  Dot,
  ImageContainer,
  ImagePlaceholder,
  MetaContainer,
  NewsImage,
  PlaceholderText,
  Source,
  Title,
  Date,
} from './ui';

interface NewsCardProps {
  news: NewsItem;
  onPress?: (news: NewsItem) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

      if (diffInHours < 1) {
        return 'Только что';
      } else if (diffInHours < 24) {
        return `${diffInHours} ч. назад`;
      } else if (diffInHours < 48) {
        return 'Вчера';
      } else {
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    } catch {
      return 'Недавно';
    }
  };

  const handlePress = () => {
    onPress?.(news);
  };

  return (
    <CardContainer onPress={handlePress} activeOpacity={0.8} disabled={!onPress}>
      <ImageContainer>
        <NewsImage
          source={{
            uri: imageError ? 'https://via.placeholder.com/400x200?text=No+Image' : news.imageUrl,
          }}
          resizeMode="cover"
          onError={handleImageError}
        />
        {imageError && (
          <ImagePlaceholder>
            <PlaceholderText>📰</PlaceholderText>
          </ImagePlaceholder>
        )}
      </ImageContainer>

      <ContentContainer>
        <Title numberOfLines={3}>{news.title}</Title>

        <MetaContainer>
          <Source numberOfLines={1}>{news.source}</Source>
          <Dot>•</Dot>
          <Date>{formatDate(news.publishedAt)}</Date>
        </MetaContainer>
      </ContentContainer>
    </CardContainer>
  );
};
