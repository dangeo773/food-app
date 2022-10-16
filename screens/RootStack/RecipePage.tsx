import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
} from 'react-native';


// import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth';

import { Recipe } from './HomePage';

import {
  Appbar,
  Button,
  Card,
  Title,
} from 'react-native-paper';
import { styles } from './RecipePage.styles';


export function RecipePage({ navigation, route }: any) {
  const auth = getAuth();
  const res: Recipe[] = route.params.recipes;
  const initial_recipes = [1, 2, 3, 4, 5, 6, 7,]
  console.log(res);

  const currentUserId = auth.currentUser!.uid;
  const [recipes, setRecipes] = useState(res);

  
  
  const renderItem = ({ item }) => (
    <View style={{
        borderWidth:2,
        borderColor:"#000000",
        padding: 20
    }}>
    <Card containerStyle = {{borderRadius: 10}}>
   <Card.Cover source={{ uri: item.image_url }} />
     <Card.Content style={{  padding: 10 }}>
      <Title style={styles.h1}>{item.name}</Title>
      <Title style={styles.h2}>{"Calories: " + item.calories}</Title>
      <Title style={styles.h3}>{"Protein: " + item.protein + "g  Carbs: " + item.carbs + "g  Fat: " + item.carbs + "g"}</Title>
      <Title style={styles.h3}>{"Prep Time: " + item.prep_time}</Title>
      <a href={item.url}><Button>See recipe</Button></a>
    </Card.Content>
   
      </Card>
      </View>
      
    
  );


  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: 'black' }}>
        <Appbar.Content title="Recipes" />
        <Appbar.Action icon="bell" />
      </Appbar.Header>
      <Button onPress = {() => navigation.navigate("HomePage")} style={styles.back}>
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
