import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomButton from '../components/CustomButton';

import CustomInput from '../components/CustomInput';

const ForgotPasswordScreen = ({navigation}) => {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomButton
        text="Send"
        onPress={() => navigation.navigate('NewPassword')}
      />

      <CustomButton
        text="Back to Sign In"
        onPress={() => navigation.navigate('SignIn')}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#F9FBFC',
  },
  Text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
});

export default ForgotPasswordScreen;
