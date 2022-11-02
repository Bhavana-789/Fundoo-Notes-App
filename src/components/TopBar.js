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
import {TextInput} from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const TopBar = ({changeLayout, searchNote, defaulttext}) => {
  const navigation = useNavigation();
  const {user, logout} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState('');

  const changeVisible = bool => {
    setVisible(bool);
  };
  console.log('--------', user);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={28} color={'white'} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{height: 35, fontSize: 20}}
              onPress={() => navigation.navigate('SearchScreen')}>
              <SafeAreaView>
                {defaulttext ? (
                  <Text
                    style={{
                      width: 250,
                      textAlign: 'center',
                      paddingTop: 5,
                      fontSize: 20,
                      color: 'white',
                    }}>
                    {defaulttext}
                  </Text>
                ) : (
                  <TextInput
                    onChangeText={searchNote}
                    style={styles.text}
                    placeholder="Search your notes"
                  />
                )}
              </SafeAreaView>
            </TouchableOpacity>
          </View>

          <View style={{paddingLeft: 10, display: 'flex'}}>
            <TouchableOpacity onPress={() => changeLayout()}>
              <Ionicons name="grid-outline" size={27} color={'white'} />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => changeVisible(true)}
              style={styles.button}>
              <Image
                source={
                  profile
                    ? {uri: profile}
                    : require('../assets/images/profile1.png')
                }
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="slide"
              visible={visible}
              onRequestClose={() => changeVisible(false)}>
              <ModalPopup
                changeVisible={changeVisible}
                setProfile={setProfile}
                profile={profile}
              />
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
    padding: 17,
    opacity: 0.8,
    height: 68,
  },
  text: {
    fontSize: 18,
    width: 240,
    color: 'black',
    paddingVertical: 1,
    fontWeight: 'bold',
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
