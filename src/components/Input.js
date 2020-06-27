import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import globalStyles from './../styles/globalStyles';

export default function Input(props) {
  return (
    <View style={styles.container}>
      <Icon name={props.icon} color="#333" size={18} />
      <TextInput style={[styles.input, props.style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: globalStyles.fontFamily,
    alignItems: 'center',
  },
  input: {
    marginLeft: 5,
  },
});
