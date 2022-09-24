import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { useContext, useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../navigation/AuthProvider';



const RegistrationScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');

  const {register} = useContext(AuthContext);



  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPessed = () => {
    console.warn('onPrivacyPressed');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onRegisterPress = () =>{
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    let tempErrorObj = {};

    if (firstname === ''){
      tempErrorObj.firstname= "please enter first name";
    }
    else if (lastname === ''){
      tempErrorObj.lastname = "Please enter last name";
    }
    else if (email === '' || !reg.test(email)){
      tempErrorObj.error = "Please enter valid email";
    }
    else if (password !== passwordRepeat){
      tempErrorObj.error = "Password does not match";
    }
    else {
      register(email,password);
    }
    setError(tempErrorObj);

  };


  return (
    <View style={styles.body}>
      <Text style={styles.title}>Create an account</Text>
      <CustomInput
      placeholder="Firstname"
      value={firstname}
      setValue={setFirstname}
      error={error.firstname} />

      <CustomInput
      placeholder="Lastname"
      value={lastname}
      setValue={setLastname} />

      <CustomInput
      placeholder="Email"
      value={email}
      setValue={setEmail}
      autoCapitalize="none" />

      <CustomInput
      placeholder="Password"
      value={password}
      setValue={setPassword}
      autoCapitalize="none"
      secureTextEntry />

      <CustomInput
      placeholder="Confirm password"
      value={passwordRepeat}
      setValue={setPasswordRepeat}
      autoCapitalize="none"
      secureTextEntry />

      <CustomButton
      text="Register"
      onPress={() =>  onRegisterPress()}
      />

      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>
          terms of use
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={onPrivacyPessed}>
          privacy policy
        </Text>
      </Text>


    {Platform.OS === 'android' ? (
      <><CustomButton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44" /><CustomButton
            text="Sign In with Facebook"
            onPress={onSignInFacebook}
            bgColor="#E7EAF4"
            fgColor="#4765A9" /></>
    ) : null }

      <CustomButton
      text="Already Registered? Sign In"
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
  text: {
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

export default RegistrationScreen;
