import { StyleSheet, StatusBar } from 'react-native';

import { AppStyles } from '../../AppStyles';

export const styles = StyleSheet.create({
  ...AppStyles,
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderColor: '#70104a',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    marginTop: 30,
    alignItems: 'center'
    
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ecf0f1',
    marginVertical: 4,
    marginHorizontal: 16,
    width: 400,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  title: {
    fontSize: 32,
  },
  delete:{
    height: 10,
    justifyContent: "center",
    bottom: 10
  },
  generate:{
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    justifyContent: "center",
    color:"#70104a",
    mode:"contained",
    alignItems: 'center',
    
  },
  add:{
    top: 17
    
  },
  small:{
    marginTop: 15,
    fontSize: 30,
    marginLeft: 10

  }
  
});
