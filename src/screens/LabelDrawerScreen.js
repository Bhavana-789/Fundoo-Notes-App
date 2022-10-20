/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

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

const LabelDrawerScreen = ({navigation, route}) => {
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [layout, setLayout] = useState(false);
  console.log('********', route.params);

  //const isFocused = useIsFocused();
  // let abc = route.params.isFocus;

  useEffect(() => {
    console.log('dddddddd');
    //const unsubscribe = navigation.addListener('focus', () => {
    // The screen is focused
    // Call any action
    getList();
    //});

    // Return the function to unsubscribe from the event so it gets removed on unmount
    //return unsubscribe;
  }, [route.params.label]);

  //const addTodo = useCallback(() => { setTodos((t) => [...t, "New Todo"]); }, [todos]);

  // useEffect(() => {
  //   if (navigation.isDrawerOpen) {
  //     getList();
  //   }
  // }, [navigation.isDrawerOpen]);

  const getList = async () => {
    console.log('ooooooooooo');
    let addedData = await fetchnotesData();

    const withoutArchivedData = addedData.filter(
      item => item.labelsArray.indexOf(route.params.label) !== -1,
      // item.isArchived === false &&
      //item.isPinned === false &&
      // item.isDeleted === false &&
    );

    const PinnedData = addedData.filter(
      item =>
        item.isPinned &&
        !item.isArchived &&
        !item.isDeleted &&
        item.labelsArray.indexOf(route.params.label) !== -1,
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

  const changeLayout = () => {
    setLayout(!layout);
  };

  // if (abc) {
  //   getList();
  //   abc = false;
  // }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
        <TopBar
          changeLayout={changeLayout}
          searchNote={searchNote}
          defaulttext={route.params.label}
        />
      </View>
      <ScrollView style={{flex: 0.8}}>
        <FlatList
          data={pinnedNotes}
          renderItem={({item}) => <NoteCard item={item} layout={layout} />}
          ListHeaderComponent={
            pinnedNotes.length > 0 ? (
              <Text style={styles.pinText}>PINNED</Text>
            ) : null
          }
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
      {/* <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
        <BottomBar />
      </View> */}
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

export default LabelDrawerScreen;
