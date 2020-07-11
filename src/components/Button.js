import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import globalStyles from './../styles/globalStyles';

export default function Button(props) {
  return props.isLoading ? (
    <ActivityIndicator color="#fff" size={30} />
  ) : (
    <TouchableOpacity
      style={[
        styles.button,
        props.disabled ? styles.disabledButton : {},
        {...props.style},
      ]}
      activeOpacity={0.9}
      disabled={props.disabled}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#080',
    width: '60%',
    height: 40,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: globalStyles.colors.secondary,
    fontFamily: globalStyles.fontFamily,
    fontSize: 16,
  },
});
