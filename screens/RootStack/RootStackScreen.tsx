import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage } from './HomePage';
import {FeedScreen} from './FeedScreen';
import {NewFoodScreen} from './NewFoodScreen';



const RootStack = createStackNavigator();

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
        <RootStack.Screen
          name="NewFoodScreen"
          options={options}
          component={NewFoodScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
