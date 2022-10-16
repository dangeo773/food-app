import { StyleSheet } from 'react-native';

import { AppStyles } from '../../AppStyles';

export const styles = StyleSheet.create({
  ...AppStyles,
  title: {
    marginTop: 120,
    color: '#EAA309',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 45,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  fillButton: {
    backgroundColor: '#000000',
    borderColor: '#EAA309',
    width: 230,
    height: 60,
    marginTop: 40,
    marginLeft: 30,
    marginRight: 25,
    padding: 10,
    borderRadius: 15,
    alignContent: 'center',
  },
  boldButton: {
    backgroundColor: '#EAA309',
    width: 230,
    height: 60,
    marginTop: 40,
    marginLeft: 30,
    marginRight: 25,
    padding: 10,
    borderRadius: 15,
    alignContent: 'center',
  },
  input: {
    width: 250,
    height: 60,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#EAA309',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    marginTop: 30,
    alignItems: 'center',
  },
});
