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
import NotesBottomBar from '../components/NotesBottomBar';
import {
  addNotes,
  updateNote,
  archiveNote,
} from '../services/NotesFirebaseServices';
import {ForceTouchGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/forceTouchGesture';

const NoteScreen = ({navigation, route, item}) => {
  const data = route?.params;
  const {user} = useContext(AuthContext);

  const [title, setTitle] = useState(data?.title || '');
  const [note, setNote] = useState(data?.note || '');
  const [isPinned, setIsPinned] = useState(data?.isPinned || false);
  const [isArchived, setIsArchived] = useState(data?.isArchived || false);
  const [isDeleted, setIsDeleted] = useState(data?.isDeleted || false);

  const onBackPress = async (
    isArchiveparams = false,
    isPinedparams = false,
    isDeletedparams = false,
  ) => {
    // old note
    if (title !== '' || note !== '') {
      let addedData = !data
        ? await addNotes(user.uid, title, note, isPinned, isArchived, isDeleted)
        : await updateNote(
            data?.id,
            title,
            note,
            isPinedparams,
            isArchiveparams,
            isDeletedparams,
          );
      setDefaultValues();
    }
  };

  const setDefaultValues = () => {
    navigation.goBack();
    console.log('Note Added');
    setTitle(null);
    setNote(null);
    setIsPinned(false);
    setIsArchived(false);
  };

  function onPinHandle(isPinnedparam) {
    setIsPinned(!isPinned);
    onBackPress(isArchived, isPinnedparam, isDeleted);
  }

  function onArchivedHandle(isArchiveparams) {
    setIsArchived(!isArchived);
    onBackPress(isArchiveparams, isPinned, isDeleted);
  }

  function onDeletedHandle(isDeletedparams) {
    setIsDeleted(!isDeleted);
    onBackPress(isArchived, isPinned, isDeletedparams);
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
    <View style={{padding: 10, paddingTop: 50, flex: 0.1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onBackPress(isArchived, isPinned, isDeleted)}>
          <Ionicons name="chevron-back" size={35} color={'#2f4f4f'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPinHandle(!isPinned)}
          style={{marginLeft: 200, padding: 7}}>
          <MaterialCommunityIcons
            name={isPinned ? 'pin' : 'pin-outline'}
            size={25}
            color={'#2f4f4f'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 10, padding: 6}}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={'#2f4f4f'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onArchivedHandle(!isArchived)}
          style={{marginLeft: 10, padding: 6}}>
          <Ionicons
            name={isArchived ? 'md-archive' : 'md-archive-outline'}
            size={24}
            color={'#2f4f4f'}
          />
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
      <View style={styles.bottomcontainer}>
        <NotesBottomBar deleteNote={() => onDeletedHandle(!isDeleted)} />
      </View>
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
  bottomcontainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -620,
  },
});

export default NoteScreen;
