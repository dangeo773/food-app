import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RecipePage } from './RecipePage';

export type RootStackParamList = {
  RecipePage: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="RecipePage">
        <RootStack.Screen
          name="RecipePage"
          options={options}
          component={RecipePage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
