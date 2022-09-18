import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import SearchScreen from '../screens/SearchScreen';
import NoteScreen from '../screens/NoteScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="drawer"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        option={{headerShown: false}}
      />
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        option={{header: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
