import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';


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
  Snackbar,
  IconButton
} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { styles } from './HomePage.styles';


export function HomePage({ navigation }: any) {
  const auth = getAuth();
  const items = [{
    id: 'vegan',
    item: 'Vegan'
  }, {
    id: 'vegetarian',
    item: 'Vegetarian'
  }, {
    id: 'Gluten',
    item: 'Gluten Free'
  }, {
    id: 'carbs',
    item: 'Low-Carb'
  }, {
    id: 'protein',
    item: 'High Protein'
  }, {
    id: 'Lactose',
    item: 'Lactose Free'
  }, {
    id: 'peanut',
    item: 'Peanut-Free'
  }
];
  const currentUserId = auth.currentUser!.uid;
  const db = getFirestore();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  // const [selectedFilter, setSelectedFilter] = useState({});

  
  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
      <Button onPress = {() => deleteIngredient(item)} style={styles.delete} mode="text">Delete</Button>
      
        
  
    </View>
  );

  const renderItem = ({ item }: { item: string }) => {
    console.log(item)
    return <Item title={item} />
  };

  useEffect(() => {
    let dbIngredients = [];
    const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
      console.log("Current data: ", doc.data());
      dbIngredients = doc.data().ingredients;
      setIngredients(dbIngredients);
    });
    return unsub;
}, [db]);



  const addIngredient = async () => {
    const peopleCollection = collection(db, "users");
    const peopleRef = doc(peopleCollection, currentUserId);
    const docSnap = await getDoc(peopleRef);
    let currentIngredients = docSnap.data().ingredients;
    currentIngredients.push(ingredient);
    await updateDoc(doc(db, "users", currentUserId) , { ingredients: currentIngredients });

  };

  const deleteIngredient = async (ingredient) => {
    const peopleCollection = collection(db, "users");
    const peopleRef = doc(peopleCollection, currentUserId);
    const docSnap = await getDoc(peopleRef);
    let currentIngredients = docSnap.data().ingredients;
    let index = 0;
    for(let i = 0; i < currentIngredients.length; i++) {
      if (currentIngredients[i] === ingredient){
          index = i;
      }
    }
    currentIngredients.splice(index, 1)
    await updateDoc(doc(db, "users", currentUserId) , { ingredients: currentIngredients });

  };

  const parseRecipes = async(response: JSON) => {
    let recipes: Recipe[] = [];
    for (const result of response.results) {
      console.log(JSON.stringify(result));
      var recipe = new Recipe();
      recipe.name = result.title;
      recipe.prep_time = result.readyInMinutes;
      let nutrients = result.nutrition.nutrients;
      recipe.url = result.sourceUrl;
      recipe.image_url = result.image;
      for (const nutrient of nutrients) {
        if (nutrient.name === "Calories") {
          recipe.calories = nutrient.amount;
        } else if (nutrient.name === "Carbohydrates") {
          recipe.carbs = nutrient.amount.toString();
        } else if (nutrient.name === "Fat") {
          recipe.fat = nutrient.amount.toString();
        } else if (nutrient.name === "Protein") {
          recipe.protein = nutrient.amount.toString();
        }
      }
      recipes.push(recipe);
    }
    navigation.navigate("RecipePage", {recipes: recipes});
    // console.log(recipes);
  }

  const getRecipes = async () => {
    let diet = '';
    let intols = '';
    let carbs = 10000;
    let protein = 0;
    for (const filter of selectedFilters) {
      if (["Vegan", "Vegetarian", "Gluten Free"].includes(filter.item)) {
        diet = filter.item;
      } else if (filter.id === "Gluten") {
        intols = intols + "Gluten,"
      } else if (filter.id === "Lactose") {
        intols = intols + "Lactose,"
      } else if (filter.id === "carbs") {
        carbs = 40;
      } else if (filter.id === "protein") {
        protein = 25;
      }
    }
    const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?' + new URLSearchParams({
      diet: diet,
      intolerances: intols,
      includeIngredients: ingredients.join(),
      addRecipeNutrition: 'true',
      ignorePantry: 'true',
      sort: 'meta-score',
      sortDirection: 'desc',
      maxCarbs: carbs.toString(),
      ranking: '2',
      minProtein: protein.toString(),
      number: '10',
      apiKey: 'f517e7e9336a46fbba025408c4976fa7',
    }))
    .then(response => response.json())
    .then(result => parseRecipes(result))
    .catch(error => console.log('error', error));
  };


  function onMultiChange() {
    return (item) => setSelectedFilters(xorBy(selectedFilters, [item], 'id'))
  }

  // function onChange() {
  //   return (val) => setSelectedFilter(val)
  // }
  // should we just make a custom appbar header? and then put it in the navigation screen options?
  // https://callstack.github.io/react-native-paper/integrate-app-bar-with-react-navigation.html

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: 'black' }}>
        <Appbar.Content title="My Ingredients" />
      </Appbar.Header>
    
      <View style={{ width: '80%', alignItems: 'center' }}>
      <SelectBox 
          label="Select multiple"
          options={items}
          selectedValues={selectedFilters}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
        />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
          style={styles.input}
          placeholder="Add Ingredient"
          value={ingredient}
          onChangeText={(name) => setIngredient(name)}
        />
         <Button style = {styles.add} onPress={addIngredient}/>

        
      </View>
      <View>
        <Button color="green" mode="contained" onPress={getRecipes}>Generate Recipes</Button>
      </View>
      <View>
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </View>
    </SafeAreaView>
  );
}
