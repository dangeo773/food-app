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
} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { styles } from './HomePage.styles';


export function HomePage({ navigation }: any) {
  const auth = getAuth();
  const items = [{
    id: '92iijs7yta',
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
  const [ingredients, setIngredients] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Apple',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Banana',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Strawberries',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571r29d72',
      title: 'Chicken Breast',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14535ree29d72',
      title: 'Orange',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1e29d72',
      title: 'Fermented Horse Cum',
    },
  ]);
  const [ingredient, setIngredient] = useState('');
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});

  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Button style={styles.delete} mode="text">Delete</Button>
      
        
  
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );


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
        <Appbar.Content title="My Pantry" />
        <Appbar.Action icon="bell" />
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
      <TextInput
          style={styles.input}
          placeholder="Add Ingredient"
          value={ingredient}
          onChangeText={(name) => setIngredient(name)}
        />
      </View>
      <View>
        <Button color="green" style={styles.delete} mode="filled">Generate Recipes</Button>
      </View>
      <View>
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
