import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage } from './HomePage';

export type RootStackParamList = {
  HomePage: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomePage">
        <RootStack.Screen
          name="HomePage"
          options={options}
          component={HomePage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
