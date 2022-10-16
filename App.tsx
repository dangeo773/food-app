import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { getApps, initializeApp } from 'firebase/app';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLOR_ACCENT, COLOR_PRIMARY } from './AppStyles';
import firebaseConfig from './keys.json';
import { EntryStackScreen } from './screens/EntryStackScreen';

// the following initializes the firebase

if (getApps().length == 0) {
  const app = initializeApp(firebaseConfig);
}

// Theme object for React Native Paper
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR_PRIMARY,
    accent: COLOR_ACCENT,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <EntryStackScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
