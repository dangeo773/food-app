import { StyleSheet, StatusBar } from 'react-native';

import { AppStyles } from '../../AppStyles';

export const styles = StyleSheet.create({
  ...AppStyles,
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#70104a',
    borderWidth: 2,
    borderRadius: 15,
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
  recipename: {
    fontSize: 32,
    textAlign: "center"  
  },
  delete:{
    marginTop: 20,
    height: 10,
    justifyContent: "center"
  },
  generate:{
    marginTop: 20,
    height: 10,
    justifyContent: "center"
  },
  back: {
    position: 'absolute',
    left: 5,
    top: 5,
     // add if dont work with above
  },
  macro: {
    fontSize: 20,
    justifyContent: "center"
  },
  b4: {
    fontSize: 15,
    textAlign: "center"
  }
});
