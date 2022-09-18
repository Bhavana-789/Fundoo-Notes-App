/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SignInScreen from '../screens/SignInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';
import AppStack from './AppStack';
import { ToggleButton } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';


const Stack = createStackNavigator();

const Navigation = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {setInitializing(false);}

  };

   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; //unsubscribe on unmount
   }, []);

  if (initializing) {return null;}
  return (
    <NavigationContainer>
      {!user ? (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      </Stack.Navigator>
      ) :
      <AppStack/>
}
    </NavigationContainer>
  );
};

export default Navigation;
