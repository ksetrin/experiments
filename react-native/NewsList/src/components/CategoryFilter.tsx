import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { NewsCategory, CategoryOption } from '../types/news.types';
import { NEWS_CATEGORIES } from '../constants';

interface CategoryFilterProps {
  selectedCategory: NewsCategory;
  query: string;
  onCategorySelect: (category: NewsCategory) => void;
  onClearFilters: () => void;
}

const FilterContainer = styled.View`
    background-color: #ffffff;
    padding: 16px;
    border-top-width: 1px;
    border-top-color: #f3f4f6;
`;

const FilterHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const FilterTitle = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    color: #374151;
`;

const ClearButton = styled.TouchableOpacity`
    padding: 4px 12px;
    border-radius: 12px;
    background-color: #ef4444;
`;

const ClearButtonText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
`;

const ActiveFiltersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

const ActiveFilterChip = styled.View`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #dbeafe;
  border-width: 1px;
  border-color: #2563eb;
`;

const ActiveFilterText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #2563eb;
`;

const CategoriesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${props => props.isSelected ? '#2563eb' : '#f8fafc'};
  border-width: 1px;
  border-color: ${props => props.isSelected ? '#2563eb' : '#e5e7eb'};
`;

const CategoryText = styled(Text)<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.isSelected ? '#ffffff' : '#374151'};
`;

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
                                                                selectedCategory,
                                                                query,
                                                                onCategorySelect,
                                                                onClearFilters,
                                                              }) => {
  const hasActiveFilters = selectedCategory !== '' || query !== '';

  const renderCategory = (category: CategoryOption) => {
    const isSelected = selectedCategory === category.value;

    return (
      <CategoryButton
        key={category.value}
        isSelected={isSelected}
        onPress={() => onCategorySelect(category.value)}
        activeOpacity={0.7}
      >
        <CategoryText isSelected={isSelected}>
          {category.label}
        </CategoryText>
      </CategoryButton>
    );
  };

  const renderActiveFilters = () => {
    if (!hasActiveFilters) return null;

    return (
      <ActiveFiltersContainer>
        {query !== '' && (
          <ActiveFilterChip>
            <ActiveFilterText>Поиск: {query}</ActiveFilterText>
          </ActiveFilterChip>
        )}
        {selectedCategory !== '' && (
          <ActiveFilterChip>
            <ActiveFilterText>
              {NEWS_CATEGORIES.find(cat => cat.value === selectedCategory)?.label}
            </ActiveFilterText>
          </ActiveFilterChip>
        )}
      </ActiveFiltersContainer>
    );
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>Категории</FilterTitle>
        {hasActiveFilters && (
          <ClearButton onPress={onClearFilters} activeOpacity={0.7}>
            <ClearButtonText>Очистить</ClearButtonText>
          </ClearButton>
        )}
      </FilterHeader>

      {renderActiveFilters()}

      <CategoriesContainer>
        {NEWS_CATEGORIES.map(renderCategory)}
      </CategoriesContainer>
    </FilterContainer>
  );
};
