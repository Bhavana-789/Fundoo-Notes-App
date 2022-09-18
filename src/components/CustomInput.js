import {View, TextInput, StyleSheet, Text} from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, error}) => {
  return (
    <View style={styles.conatiner}>
      <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      />
      {error && <Text style={{color:'red'}}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical:5,
    },
    input: {},

});

export default CustomInput;
