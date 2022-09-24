import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import floatingButton from '../assets/images/floatingButton.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

//const WIDTH = Dimensions.get('window').width;
const BottomBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginLeft: 20}} onPress={() => {}}>
        <MaterialIcons name="done-outline" size={25} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: 20}} onPress={() => {}}>
        <Ionicons name="brush" size={25} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: 20}} onPress={() => {}}>
        <MaterialCommunityIcons name="microphone-outline" size={26} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: 20}} onPress={() => {}}>
        <FontAwesome name="image" size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Note')}>
        <Entypo name="plus" size={38} color={'#2f4f4f'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#778899',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 6,
    marginBottom: 10,
    opacity: 0.8,
    alignItems: 'center',
  },
  floatingButton: {
    borderWidth: 7,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 80,
    backgroundColor: '#00ced1',
    borderRadius: 100,
    marginBottom: 15,
    marginRight: 5,
  },
});

export default BottomBar;
