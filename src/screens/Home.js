/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import firestore from '@react-native-firebase/firestore';
import NoteCard from '../components/NoteCard';
import {fetchnotesData, deleteNote} from '../services/NotesFirebaseServices';

const HomeScreen = ({navigation}) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getList();
      //unPinnedList();
      //pinnedList();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    let addedData = await fetchnotesData();
    console.log(addedData);
    const withoutArchivedData = addedData.filter(
      item => item.isArchived === false,
    );

    console.log('without archived data:', withoutArchivedData);

    setNotes(withoutArchivedData);
  };

  // const unPinnedList = async () => {
  //   let addedData = await fetchnotesData();
  //   const withoutPinnedData = addedData.filter(item => item.isPinned === false);
  //   setNotes(withoutPinnedData);
  // };

  // const pinnedList = async () => {
  //   let addedData = await fetchnotesData();
  //   const withPinnedData = addedData.filter(item => item.isPinned === true);
  //   setNotes(withPinnedData);
  // };

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

  // firestore()
  //   .collection('notes')
  //   .doc(notesId)
  //   .delete()
  //   .then(() => {
  //     console.log('note deleted!');
  //     deleteFirestoreData(notesId);
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });

  // const deleteFirestoreData = notesId => {
  //   firestore()
  //     .collection('notes')
  //     .doc(notesId)
  //     .delete()
  //     .then(() => {
  //       console.log('note deleted');
  //     });
  // };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
        <TopBar />
      </View>
      <View style={{flex: 0.8}}>
        <FlatList
          data={notes}
          renderItem={({item}) => (
            <NoteCard item={item} onDelete={deleteNoteData} />
          )}
          keyExtractor={item => item.id}
          // numColumns={}
        />
      </View>
      <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
        <BottomBar />
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
