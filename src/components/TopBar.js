import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import ModalPopup from './ModalPopup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profile1 from '../assets/images/profile1.png';

const TopBar = () => {

  const navigation = useNavigation();
  const {user, logout} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  console.log(visible);

  const changeVisible = bool => {
    setVisible(bool);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={28} color={'white'} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}>
              <Text style={styles.text}>Search your notes</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 60}}>
            <Ionicons name="grid-outline" size={27} color={'white'} />
          </View>
          <View>
            <TouchableOpacity onPress={() =>changeVisible(true)} style={styles.button}>
              <Image
                source={profile1}
                style={{width: 80, height: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="slide"
              visible={visible}
              onRequestClose={() => changeVisible(false)}>
                <ModalPopup
                changeVisible={changeVisible}/>

              </Modal>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 8,
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'black',
    borderRadius: 20,
  },
  inputContainer: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: '#778899',
    borderRadius: 30,
    padding: 15,
    opacity: 0.8,
  },
  text: {
    fontSize: 20,
    paddingLeft: 15,
    color: 'white',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    paddingLeft: 5,
    paddingRight: 0,
  },
});

export default TopBar;
