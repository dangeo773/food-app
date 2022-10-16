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

export function HomePage({ navigation }: any) {
  const auth = getAuth();

  const currentUserId = auth.currentUser!.uid;

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
      </View>
    </View>
  );
}
