/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import profile1 from '../assets/images/profile1.png';
import {AuthContext} from '../navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

const WIDTH = Dimensions.get('window').width;
//const HEIGHT_MODAL = 150;
const ModalPopup = props => {
  const [image, setImage] = useState(profile1);
  const [modalVisible, setModalVisible] = useState(false);

  const {user, logout} = useContext(AuthContext);

  const closeModal = bool => {
    props.changeVisible(bool);
  };

  const openModal = bool => {
    setModalVisible(bool);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(imageData => {
        console.log(image);
        setImage(imageData.path);
      })
      .catch(e => {
        console.log(e);
      });
    console.log('Take Photo');
  };
  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(imageData => {
        console.log(image);
        setImage(imageData.path);
      })
      .catch(e => {
        console.log(e);
      });

    console.log('Choose Photo From Library');
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={{marginRight: 240, paddingTop: 10}}>
          <TouchableOpacity onPress={() => closeModal(false)}>
            <Entypo name="cross" size={30} color={'#696969'} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ImageBackground style={styles.image} source={image}>
            <View>
              <TouchableOpacity onPress={() => openModal(true)}>
                <Ionicons
                  name="camera"
                  size={20}
                  color={'black'}
                  style={styles.camicon}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => openModal(false)}>
                <TouchableOpacity disabled={true} style={styles.container}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.text1}>Set Profile Photo</Text>
                    <TouchableOpacity onPress={takePhotoFromCamera}>
                      <Text
                        style={{
                          fontSize: 19,
                          padding: 15,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        Take Photo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={chooseFromLibrary}>
                      <Text
                        style={{
                          fontSize: 19,
                          padding: 15,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        Choose Photo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </ImageBackground>
          <Text style={styles.text}>{user.email}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => logout()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: WIDTH - 40,
    height: 200,
    paddingTop: 0,
    marginTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 20,
    padding: 10,
    borderRadius: 4,
  },
  container: {
    paddingTop: 85,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 45,
    width: 45,
    paddingTop: 10,
    alignContent: 'flex-end',
    marginTop: 15,
    marginLeft: 8,
  },
  text: {
    fontSize: 18,
    color: '#696969',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    marginBottom: 80,
    marginLeft: 20,
    paddingTop: 25,
  },
  camicon: {
    borderRadius: 10,
    marginTop: 9,
    marginLeft: 26,
  },
  text1: {
    fontSize: 22,
    color: 'black',
    padding: 10,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 110,
    marginRight: 150,
    justifyContent: 'center',
    marginHorizontal: -160,
    backgroundColor: 'white',
  },
});

export default ModalPopup;
