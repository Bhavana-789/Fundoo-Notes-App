import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';

import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import firestore from '@react-native-firebase/firestore';
import NoteCard from '../components/NoteCard';
import {fetchnotesData, deleteNote} from '../services/NotesFirebaseServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ArchiveHeader from '../components/ArchiveHeader';

const ArchiveScreen = ({navigation}) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    let addedData = await fetchnotesData();

    const withArchivedData = addedData.filter(item => item.isArchived === true);

    setNotes(withArchivedData);
  };

  // useEffect(() => {
  //   const fetchnotesData = async () => {
  //     try {
  //       const list = [];

  //       await firestore()
  //         .collection('notes')
  //         .get()
  //         .then(querySnapshot => {
  //           //console.log('Total notes: ', querySnapshot.size);

  //           querySnapshot.forEach(doc => {
  //             const {userId, title, note} = doc.data();
  //             list.push({
  //               id: doc.id,
  //               userId,
  //               title,
  //               note,
  //             });
  //           });
  //         });

  //       setNotes(list);

  //       //console.log(notes);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchnotesData();
  // }, []);

  const deleteNoteData = notesId => {
    console.log('note id is', notesId);
    deleteNote(notesId);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
        <ArchiveHeader />
      </View>

      <View style={{flex: 0.8}}>
        <FlatList
          data={notes}
          renderItem={({item}) => (
            <NoteCard item={item} onDelete={deleteNoteData} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
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
    borderRadius: 0,
  },
  inputContainer: {
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#778899',
    borderRadius: 0,
    padding: 15,
    opacity: 0.8,
  },
  text: {
    fontSize: 20,
    paddingLeft: 55,
    color: 'white',
    flexDirection: 'row',
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

export default ArchiveScreen;
