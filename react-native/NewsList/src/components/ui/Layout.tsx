import styled from 'styled-components/native';

export const CARD_MARGIN = 16;
export const IMAGE_HEIGHT = 200;

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

export const ContentContainer = styled.View`
  padding: 16px;
`;

export const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const LoadingContainer = styled.View`
  padding: 8px 0;
`;

export const ImagePlaceholder = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 12px;
  margin: 8px ${CARD_MARGIN}px;
  elevation: 3;
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: ${IMAGE_HEIGHT}px;
  position: relative;
`;

export const NewsImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
