import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
//import { IconAdornment } from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import TopBar from '../components/TopBar';
import {AuthContext} from '../navigation/AuthProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchScreen from './SearchScreen';
import BottanBar from '../components/BottomBar';

const HomeScreen = () => {
  //const [user,logout] = useContext(AuthContext);
  return (
    <View>
      <View>
        <TopBar />
        <View style={{flex: 0.1, marginTop: 620}}>
          <BottanBar />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default HomeScreen;
