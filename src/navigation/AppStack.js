import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from '../screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import Search from '../screens/Search';
import Note from '../screens/Note';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="drawer"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        option={{headerShown: false}}
      />
      <Stack.Screen
        name="Note"
        component= {Note}
        option={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
