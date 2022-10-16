import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HomePage } from './HomePage';
import {FeedScreen} from './FeedScreen';
import {NewFoodScreen} from './NewFoodScreen';
import {RecipePage} from './RecipePage';



const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigators() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Friends' Cooks!" component={FeedScreen} />
    <Tab.Screen name="Post Your Cook!" component ={NewFoodScreen} />
    <Tab.Screen name="HomePage" component={HomePage} />
    </Tab.Navigator>
  );
}

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="TabNavigators"
          component={TabNavigators}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="RecipePage" component={RecipePage} />
      </RootStack.Navigator>

      </NavigationContainer>
      
  );
}

/*        <RootStack.Screen
          name="HomePage"
          options={options}
          component={HomePage}
        />*/