import { StyleSheet, StatusBar } from 'react-native';

import { AppStyles } from '../../AppStyles';

export const styles = StyleSheet.create({
  ...AppStyles,
  input: {
    backgroundColor: 'white',
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    borderColor: '#EAA309',
    // borderWidth: 2,
    // borderRadius: 15,
    fontSize: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  
  add:{
    icon: "plus" ,
    color: "black", 
    mode: "contained",
  }
});
