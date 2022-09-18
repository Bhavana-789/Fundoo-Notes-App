import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useState } from 'react';
import {List} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';

const NoteScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [title, setTitle] = useState(null);
  const [note, setNote] = useState(null);


  const onBackPress = () => {
    firestore()
    .collection('notes')
    .add({
      userId: user.uid,
      title: title,
      note: note,
    })
    .then(() => {
      console.log('Note Added');
      setTitle(null);
      setNote(null);

    })
    .catch((error) => {
      console.log('Something went wrong');
    });
  };

  return (
    <View style={{padding: 10, paddingTop: 50}} >
      <View style= {styles.container}>
      <TouchableOpacity onPress={onBackPress}>
      <Ionicons name = "chevron-back" size ={35} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: 200, padding: 7}}>
        <MaterialCommunityIcons name="pin-outline" size={25} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: 10, padding: 6}}>
        <MaterialCommunityIcons name="bell-outline" size={24} />
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft: 10, padding: 6}}>
        <Ionicons name="md-archive-outline" size={24} />
      </TouchableOpacity>
      </View>

      <TextInput
      style={styles.titleInput}
      placeholder="Title"
      value={title}
      onChangeText={(content) => setTitle(content)}
      />
      <TextInput
      style={styles.noteInput}
      placeholder="Note" multiline={true}
      value={note}
      onChangeText={(content) => setNote(content)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    padding: 2,
    marginBottom: 10,
  },
  item: {
    fontSize: 56,
  },
  titleInput: {
    padding: 15,
    fontSize: 28,

  },
  noteInput: {
    padding: 15,
    fontSize: 22,
    marginTop: -20,

  },
});

export default NoteScreen;
