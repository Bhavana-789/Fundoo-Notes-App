import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from './CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import profile1 from '../assets/images/profile1.png';

const WIDTH = Dimensions.get('window').width;

const ProfileModal = ({}) => {
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
    });
    console.warn('Take Photo');
  };
  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });

    console.warn('Choose Photo From Library');
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.text}>Set Profile Photo</Text>
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
    fontSize: 22,
    color: 'black',
    padding: 10,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
});

export default ProfileModal;
