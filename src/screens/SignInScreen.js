import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Logo from '../assets/images/Logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../navigation/AuthProvider';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const {height} = useWindowDimensions();

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.2}]}
          resizeMode="contain"
        />
        <Text style={styles.text}>Fundoo Notes</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton onPress={() => login(username, password)}>
          Sign in
        </CustomButton>

        <CustomButton
          text="Forgot password?"
          onPress={() => navigation.navigate('ForgotPassword')}
          type="TERTIARY"
        />

        {Platform.OS === 'android' ? (
          <>
            <CustomButton
              text="Sign In with Google"
              onPress={onSignInGoogle}
              bgColor="#FAE9EA"
              fgColor="#DD4D44"
            />
            <CustomButton
              text="Sign In with Facebook"
              onPress={onSignInFacebook}
              bgColor="#E7EAF4"
              fgColor="#4765A9"
            />
          </>
        ) : null}

        <CustomButton
          text="Dont have an account? Register"
          onPress={() => navigation.navigate('Register')}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    padding: 30,
  },
  text: {
    margin: 10,
    color: '#696969',
    fontSize: 25,
    fontStyle: 'bold',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
