/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SignIn from '../screens/SignIn';
import Registration from '../screens/Registration';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';

import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';
import AppStack from './AppStack';



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
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Registration} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
      </Stack.Navigator>
      ) :
      <AppStack/>
}
    </NavigationContainer>
  );
};

export default Navigation;
