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
    item: 'Vegan'
  }, {
    id: 'a0s0a8ssbsd',
    item: 'Vegetarian'
  }, {
    id: '16hbajsabsd',
    item: 'Gluten-Free'
  }, {
    id: 'nahs75a5sg',
    item: 'Low Calorie'
  }, {
    id: '667atsas',
    item: 'High Protein'
  }, {
    id: 'hsyasajs',
    item: 'Lactose'
  }, {
    id: 'djsjudksjd',
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
  const [selectedFilter, setSelectedFilter] = useState({});

  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Button onPress = {() => deleteIngredient(title)} style={styles.delete} mode="text">Delete</Button>
      
        
  
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

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


  function onMultiChange() {
    return (item) => setSelectedFilters(xorBy(selectedFilters, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedFilter(val)
  }
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
        <Button color="green" mode="contained">Generate Recipes</Button>
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
