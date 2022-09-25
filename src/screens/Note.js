import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {addNotes, updateNote} from '../services/NotesFirebaseServices';

const NoteScreen = ({navigation, route, item}) => {
  const data = route.params;
  const {user} = useContext(AuthContext);
  console.log('params', data);

  const [title, setTitle] = useState(data?.title || '');
  const [note, setNote] = useState(data?.note || '');
  const [isPinned, setIsPinned] = useState(data?.isPinned || false);
  const [isArchived, setIsArchived] = useState(data?.isArchived || false);

  const onBackPress = async () => {
    // old note
    if (title !== '' || note !== '') {
      let addedData = !data
        ? await addNotes(user.uid, title, note, isPinned, isArchived)
        : await updateNote(data.id, title, note);

      if (addedData) {
        navigation.navigate('Home');
        console.log('Note Added');
        setTitle(null);
        setNote(null);
        setIsPinned(false);
        setIsArchived(false);
      }
    }
    //   } else {
    //     navigation.navigate('Home');
    //     setTitle(null);
    //     setNote(null);
    //     setIsPinned(false);
    //     setIsArchived(false);
    //   }
    // } else {
    //   // new note
    // }
    // if (notesId) {
    //   await updateNote(notesId, title, note);
    //   console.log('notes id is:', notesId);
    // }
  };

  function onPinHandle(params) {
    setIsPinned(!isPinned);
  }

  function onArchivedHandle(params) {
    setIsArchived(!isArchived);

    onBackPress();
  }

  // firestore()
  //   .collection('notes')
  //   .add({
  //     userId: user.uid,
  //     title: title,
  //     note: note,
  //   })
  //   .then(() => {
  //     navigation.navigate('Home');
  //     console.log('Note Added');
  //     setTitle(null);
  //     setNote(null);
  //   })
  //   .catch(error => {
  //     console.log('Something went wrong');
  //   });

  return (
    <View style={{padding: 10, paddingTop: 50}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="chevron-back" size={35} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPinHandle}
          style={{marginLeft: 200, padding: 7}}>
          <MaterialCommunityIcons
            name={isPinned ? 'pin' : 'pin-outline'}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 10, padding: 6}}>
          <MaterialCommunityIcons name="bell-outline" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onArchivedHandle}
          style={{marginLeft: 10, padding: 6}}>
          <Ionicons name="md-archive-outline" size={24} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={content => setTitle(content)}
      />
      <TextInput
        style={styles.noteInput}
        placeholder="Note"
        multiline={true}
        value={note}
        onChangeText={content => setNote(content)}
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
    color: 'black',
  },
  noteInput: {
    padding: 15,
    fontSize: 22,
    marginTop: -20,
  },
});

export default NoteScreen;
