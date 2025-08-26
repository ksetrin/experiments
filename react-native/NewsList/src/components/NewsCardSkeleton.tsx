import React from 'react';
import styled from 'styled-components/native';
import { CARD_MARGIN, ContentContainer, Dot, IMAGE_HEIGHT, MetaContainer } from './ui';

const SkeletonContainer = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  margin: 8px ${CARD_MARGIN}px;
  elevation: 3;
  overflow: hidden;
  opacity: 0.6;
`;

const SkeletonImage = styled.View`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  background-color: #e5e7eb;
`;

const SkeletonTitle = styled.View<{ width?: string }>`
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 8px;
  width: ${props => props.width || '100%'};
`;

const SkeletonMeta = styled.View<{ width?: number; flex?: number }>`
  height: 14px;
  background-color: #e5e7eb;
  border-radius: 4px;
  ${props => (props.width ? `width: ${props.width}px;` : '')}
  ${props => (props.flex ? `flex: ${props.flex};` : '')}
`;

export const NewsCardSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <ContentContainer>
        <SkeletonTitle />
        <SkeletonTitle width="70%" />
        <MetaContainer>
          <SkeletonMeta flex={1} />
          <Dot>•</Dot>
          <SkeletonMeta width={80} />
        </MetaContainer>
      </ContentContainer>
    </SkeletonContainer>
  );
};
