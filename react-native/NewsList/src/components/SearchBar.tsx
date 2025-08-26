import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';
import styled from 'styled-components/native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
`;

const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 25px;
  padding: 0 15px;
  margin-right: 8px;
  border: 1px solid #e5e7eb;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  height: 40px;
  font-size: 16px;
  color: #374151;
`;

const ClearButton = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 2px;
`;

const ClearText = styled(Text)`
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #2563eb;
  border-radius: 20px;
  padding: 10px 16px;
  align-items: center;
  justify-content: center;
`;

const SearchText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Поиск новостей...',
  initialValue = '',
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <SearchContainer>
      <InputContainer>
        <StyledTextInput
          placeholder={placeholder}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          placeholderTextColor="#6b7280"
        />
        {query.length > 0 && (
          <ClearButton onPress={handleClear}>
            <ClearText>×</ClearText>
          </ClearButton>
        )}
      </InputContainer>
      <SearchButton onPress={handleSearch} activeOpacity={0.7}>
        <SearchText>Поиск</SearchText>
      </SearchButton>
    </SearchContainer>
  );
};
