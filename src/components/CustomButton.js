import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, children}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.container,
      styles[`container_${type}`],
      bgColor ? {backgroundColor : bgColor} : {},
      ]}>
      <Text style={[
        styles.text,
        styles[`text_${type}`],
        fgColor ? {color : fgColor} : {},
        ]}>{children || text}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B71F3',
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },
  container_TERTIARY: {
    backgroundColor: 'F9FBFC',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
