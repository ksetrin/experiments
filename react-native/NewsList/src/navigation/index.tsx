import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewsListNavigator } from './NewsListNavigator';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <NewsListNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};
