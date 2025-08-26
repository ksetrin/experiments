import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const DetailImageContainer = styled.View`
  width: 100%;
  height: 250px;
  position: relative;
`;

export const DetailImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const DetailContent = styled.View`
  padding: 20px;
`;

export const DetailTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 36px;
  margin-bottom: 16px;
`;

export const DetailMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const DetailSource = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #2563eb;
`;

export const DetailAuthor = styled.Text`
  font-size: 14px;
  color: #6b7280;
  font-style: italic;
`;

export const DetailDate = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

export const DetailDescription = styled.Text`
  font-size: 16px;
  color: #4b5563;
  line-height: 24px;
  margin-bottom: 16px;
  font-style: italic;
`;

export const DetailText = styled.Text`
  font-size: 16px;
  color: #374151;
  line-height: 26px;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 20px;
  padding-bottom: 20px;
`;

export const ActionButton = styled.TouchableOpacity<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.variant === 'primary' ? '#2563eb' : '#f3f4f6')};
  border: ${props => (props.variant === 'secondary' ? '1px solid #d1d5db' : 'none')};
`;

export const ButtonText = styled.Text<{ variant?: 'primary' | 'secondary' }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.variant === 'primary' ? '#ffffff' : '#374151')};
`;
