/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import firestore from '@react-native-firebase/firestore';
import NoteCard from '../components/NoteCard';
import {fetchnotesData, deleteNote} from '../services/NotesFirebaseServices';

const HomeScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [layout, setLayout] = useState(false);

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

    const withoutArchivedData = addedData.filter(
      item =>
        item.isArchived === false &&
        item.isPinned === false &&
        item.isDeleted === false,
    );

    const PinnedData = addedData.filter(
      item => item.isPinned && !item.isArchived && !item.isDeleted,
    );

    setNotes(withoutArchivedData);
    setPinnedNotes(PinnedData);
  };

  const searchNote = text => {
    if (text.length === 0) {
      getList();
      return;
    }
    let _others = notes.filter(item => item.title.includes(text));
    let _pinNote = pinnedNotes.filter(item => item.title.includes(text));
    setNotes(_others);
    setPinnedNotes(_pinNote);
    console.log('search is:', text);
  };

  const deleteNoteData = notesId => {
    console.log('note id is', notesId);
    deleteNote(notesId);
  };

  const changeLayout = () => {
    setLayout(!layout);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
        <TopBar changeLayout={changeLayout} searchNote={searchNote} />
      </View>
      <ScrollView style={{flex: 0.8}}>
        <FlatList
          data={pinnedNotes}
          renderItem={({item}) => <NoteCard item={item} layout={layout} />}
          ListHeaderComponent={<Text style={styles.pinText}>PINNED</Text>}
          keyExtractor={item => item.id}
          numColumns={layout ? 2 : 1}
          scrollEnabled={false}
          key={layout ? 2 : 1}
        />

        <FlatList
          data={notes}
          renderItem={({item}) => <NoteCard item={item} layout={layout} />}
          ListHeaderComponent={<Text style={styles.otherText}>OTHERS</Text>}
          keyExtractor={item => item.id}
          numColumns={layout ? 2 : 1}
          scrollEnabled={false}
          key={layout ? 3 : 4}
        />
      </ScrollView>
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
  pinText: {
    padding: 15,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: -18,
  },
  otherText: {
    padding: 15,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: -15,
  },
});

export default HomeScreen;
