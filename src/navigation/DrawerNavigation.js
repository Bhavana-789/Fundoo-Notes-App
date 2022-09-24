import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NoteScreen from '../screens/Note';
import RemindersScreen from '../screens/Reminders';
import LabelScreen from '../screens/Label';
import ArchiveScreen from '../screens/Archive';
import DeletedScreen from '../screens/Deleted';
import SettingScreen from '../screens/Setting';
import CustomDrawer from '../components/CustomDrawer';
import HomeScreen from '../screens/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawer props={props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{header: () => null}} />
        <Drawer.Screen name="Reminders" component={RemindersScreen} options={{header: () => null}} />
        <Drawer.Screen name="Labels" component={LabelScreen} options={{header: () => null}} />
        <Drawer.Screen name="Archive" component={ArchiveScreen} options={{header: () => null}} />
        <Drawer.Screen name="Deleted" component={DeletedScreen} options={{header: () => null}} />
        <Drawer.Screen name="Settings" component={SettingScreen} options={{header: () => null}} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
