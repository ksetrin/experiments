import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsListStack } from '../types/navigation';
import NewsListScreen from '../screens/NewsListScreen';
import NewsListItemScreen from '../screens/NewsListItemScreen';

const Stack = createNativeStackNavigator<NewsListStack>();

const newsListOptions = {
  title: 'Новости',
};
const newsListItemOptions = {
  title: 'Новость',
};

export const NewsListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={NewsListScreen} name="NewsListScreen" options={newsListOptions} />
      <Stack.Screen component={NewsListItemScreen} name="NewsListItemScreen" options={newsListItemOptions} />
    </Stack.Navigator>
  );
};
