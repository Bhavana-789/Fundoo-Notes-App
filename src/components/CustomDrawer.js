import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import {Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-ionicons';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {getLabels} from '../redux/action';
//import { useNavigation } from '@react-navigation/native';

//import { color } from 'react-native-reanimated';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const labels = useSelector(state => state.labels);
  return (
    <DrawerContentScrollView props={props}>
      <View style={styles.body}>
        <Text style={{fontSize: 28, color: 'black', fontFamily: 'arial'}}>
          Fundoo Notes
        </Text>
      </View>
      <View style={{flex: 1, paddingTop: 10}}>
        <DrawerItem
          icon={({color}) => (
            <MaterialCommunityIcons
              name="lightbulb-outline"
              color={color}
              size={24}
            />
          )}
          label={() => (
            <Text style={{fontSize: 15, color: 'black'}}>Notes</Text>
          )}
          onPress={() => navigation.navigate('Home')}
        />

        <DrawerItem
          icon={({color}) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={24}
            />
          )}
          label={() => (
            <Text style={{fontSize: 15, color: 'black'}}>Reminders</Text>
          )}
          onPress={() => navigation.navigate('Reminders')}
        />

        <DrawerItem
          icon={({color}) => <Entypo name="plus" color={color} size={24} />}
          label={() => (
            <Text style={{fontSize: 15, color: 'black'}}>Labels</Text>
          )}
          onPress={() => navigation.navigate('Labels')}
        />

        <View>
          {labels.map(item => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('LabelDrawerScreen', item)}
                key={item.label}
                style={{flexDirection: 'row', padding: 3, marginLeft: 20}}>
                <MaterialIcons name="label-outline" size={24} style={{}} />
                <Text style={{fontSize: 15, marginLeft: 30, color: 'black'}}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <DrawerItem
          icon={({color}) => (
            <Ionicons name="archive" color={color} size={24} />
          )}
          label={() => (
            <Text style={{fontSize: 15, color: 'black'}}>Archive</Text>
          )}
          onPress={() => navigation.navigate('Archive')}
        />

        <DrawerItem
          icon={({color}) => (
            <AntDesign name="delete" color={color} size={24} />
          )}
          label={() => (
            <Text style={{fontSize: 15, color: 'black'}}>Deleted</Text>
          )}
          onPress={() => navigation.navigate('Deleted')}
        />

        <DrawerItem
          icon={({color}) => (
            <MaterialIcons name="settings" color={color} size={24} />
          )}
          label={() => (
            <Text style={{fontSize: 15, color: 'black'}}>Settings</Text>
          )}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#f6f6f',
    marginBottom: 10,
  },
});

export default CustomDrawer;
