import React from 'react';
import { View, Text } from 'react-native';

// import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  setDoc,
  where,
  query,
  getDocs,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocFromCache,
} from 'firebase/firestore';
import {
  Provider,
  Portal,
  Appbar,
  Card,
  Button,
  Paragraph,
  Title,
  Modal,
  RadioButton,
} from 'react-native-paper';

import { styles } from './HomePage.styles';

export class Recipe {
  name: string = '';
  carbs: string = '';
  protein: string = '';
  fat: string = '';
  calories: number = 0;
  prep_time: number = 0;
  url: string = '';
  image_url: string = '';
}

export function HomePage({ navigation }: any) {
  const auth = getAuth();

  const currentUserId = auth.currentUser!.uid;

  const parseRecipes = async(response: JSON) => {
    // console.log(JSON.stringify(response));
    let recipes: Recipe[] = [];
    for (const result of response.results) {
      console.log(JSON.stringify(result));
      var recipe = new Recipe();
      recipe.name = result.title;
      recipe.prep_time = result.readyInMinutes;
      let servings = result.servings;
      let nutrients = result.nutrition.nutrients;
      recipe.url = result.sourceUrl;
      recipe.image_url = result.image;
      for (const nutrient of nutrients) {
        if (nutrient.name === "Calories") {
          recipe.calories = Math.floor(nutrient.amount/servings);
        } else if (nutrient.name === "Carbohydrates") {
          recipe.carbs = (nutrient.amount/servings).toFixed(2);
        } else if (nutrient.name === "Fat") {
          recipe.fat = (nutrient.amount/servings).toFixed(2);
        } else if (nutrient.name === "Protein") {
          recipe.protein = (nutrient.amount/servings).toFixed(2);
        }
      }
      recipes.push(recipe);
    }
    console.log(recipes)
  }

  const getRecipes = async () => {
    const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?' + new URLSearchParams({
      diet: 'vegetarian',
      intolerances: '',
      includeIngredients: 'tomato,corn,onion,avacado,cilantro',
      addRecipeNutrition: 'true',
      ignorePantry: 'true',
      sort: 'meta-score',
      sortDirection: 'desc',
      maxCarbs: '10000',
      ranking: '2',
      minProtein: '0',
      number: '10',
      apiKey: '348fb7169b9143e387b7404377bc6b0e',
    }))
    .then(response => response.json())
    .then(result => parseRecipes(result))
    .catch(error => console.log('error', error));
  };

  // should we just make a custom appbar header? and then put it in the navigation screen options?
  // https://callstack.github.io/react-native-paper/integrate-app-bar-with-react-navigation.html

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: 'black' }}>
        <Appbar.Content title="The Locker Room" />
        <Appbar.Action icon="bell" />
      </Appbar.Header>

      <View>
        <Text style={{ color: '#EAA309' }}>Hello</Text>
        <Button icon="camera" mode="contained" onPress={() => getRecipes()}>
          Press me
        </Button>
      </View>
    </View>
  );
}
