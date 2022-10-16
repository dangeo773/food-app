import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { getFirestore, collection, setDoc, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Snackbar, Button, Appbar } from 'react-native-paper';

import { styles } from './SignInScreen.styles';

/*
interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}*/

export default function SignUpScreen({ navigation, route }) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign In Button (goes to Sign In Screen)
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/start
  */
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');

  const onDismissSnackBar = () => setVisible(false);

  const createUser =  () => {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setLoading(false);
        console.log('User account created & signed in!');
        const currentUserId = auth.currentUser!.uid;
        const db = getFirestore();
        const peopleCollection = collection(db, "users");
        const peopleRef = doc(peopleCollection, currentUserId);
        await setDoc(peopleRef, {uid: currentUserId, ingredients: []});
      })
      .catch((error) => {
        setLoading(false);
        setVisible(true);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setSnackBarText('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setSnackBarText('That email address is invalid!');
        }
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to Recipify! </Text>
        <Text style={styles.subTitle}> Create An Account </Text>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={(name) => setEmail(name)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(location) => setPassword(location)}
          style={styles.input}
        />
        <Button
          mode="contained"
          style={styles.boldButton}
          labelStyle={{ color: 'white' }}
          onPress={createUser}
          loading={loading}
        >
          Sign Up
        </Button>
        <Button
          mode="text"
          style={{ marginTop: 20, marginLeft: 25, marginRight: 25, padding: 7 }}
          labelStyle={{ color: '#FFFFFF' }}
          onPress={() => navigation.navigate('SignInScreen')}
        >
          Or, Sign In Instead
        </Button>
        <Snackbar
          wrapperStyle={{ top: 0 }}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {snackBarText}{' '}
        </Snackbar>
      </View>
    </>
  );
}
