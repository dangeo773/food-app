import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  ref,
} from 'firebase/firestore';
import { Snackbar, Button, Appbar } from 'react-native-paper';

import { AuthStackParamList } from './AuthStackScreen';
import { styles } from './SignInScreen.styles';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'SignInScreen'>;
}

export default function SignInScreen({ navigation }) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign Up Button (goes to Sign Up screen)
      - Reset Password Button
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/starts
  */

  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');

  const onDismissSnackBar = () => setVisible(false);

  const resetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!');
        setVisible(true);
        setSnackBarText('Password reset email sent!');
      })
      .catch((error) => {
        setVisible(true);
        if (error.code === 'auth/user-not-found') {
          console.log('User not found!');
          setSnackBarText('User not found!');
        }
      });
  };

  const signIn = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setLoading(false);
        const currentUserId = auth.currentUser!.uid;
        console.log(currentUserId);
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        setLoading(false);
        setVisible(true);
        if (error.code === 'auth/invalid-email') {
          console.log('Email not found! Please create an account!');
          setSnackBarText('Email not found! Please create an account!!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Wrong password!');
          setSnackBarText('Wrong password! Please try again.');
        }
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to Recipify! </Text>
        <Text style={styles.subTitle}> Sign In </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(name) => setEmail(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(location) => setPassword(location)}
        />
        <Button
          mode="text"
          color="grey"
          onPress={resetPassword}
          style={{ marginLeft: 40, marginRight: 25, marginTop: 5 }}
          labelStyle={{ color: '#FFFFFFFF' }}
        >
          Forgot Password?
        </Button>
        <Button
          mode="contained"
          style={styles.boldButton}
          labelStyle={{ color: 'white' }}
          loading={loading}
          onPress={signIn}
        >
          Sign In
        </Button>
        <Text style={styles.subTitle}> - or - </Text>
        <Button
          mode="contained"
          style={styles.fillButton}
          labelStyle={{ color: '#ffffff' }}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          Create An Account
        </Button>
        <Snackbar
          style={{ marginBottom: 30 }}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {snackBarText}{' '}
        </Snackbar>
      </View>
    </>
  );
}
