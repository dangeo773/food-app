import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

// import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth';
import {
  Appbar,
  Button,
} from 'react-native-paper';
import { styles } from './RecipePage.styles';


export function RecipePage({ navigation }: any) {
  const auth = getAuth();
  
  const initial_recipes = [1, 2, 3, 4, 5, 6, 7,]
  var dummy = []
  for (var i=0; i<initial_recipes.length; i++){
    dummy.push(
        {
            name: i.toString(),
            carbs: "17",
            protein: "200",
            fat: "-123",
            url: "http://google.com",
            prep_time: 0,
            calories: 0,
        }
    )
  }

  const currentUserId = auth.currentUser!.uid;
  const [recipes, setRecipes] = useState(dummy);

  
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>

      <Text style={styles.recipename}>{item.name + "\n"}</Text>

        <Text style={styles.macro}>
            {"\nProtein: " + item.protein + "g  Carbs: " + item.carbs + "g  Fat: " + item.carbs + "g"}
        </Text>
        <Text style={styles.b4}>
            {"\nPrep Time: " + item.prep_time}
            
        </Text>

      
      <a href={item.url}>
      <Button style={styles.delete} mode="text">
      link
      </Button>
      </a>
        
  
    </View>
        
    
    
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: 'black' }}>
        <Appbar.Content title="Recipes" />
        <Appbar.Action icon="bell" />
      </Appbar.Header>
      <Button style={styles.back}>
        Back
        </Button>
      <View>
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      </View>
    </SafeAreaView>
  );
}
