import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';
import profile1 from '../assets/images/profile1.png';
import {fetchnotesData, deleteNote} from '../services/NotesFirebaseServices';
import NoteCard from '../components/NoteCard';

const DeletedScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);

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
    console.log('del data1 :', addedData);

    const withDeletedData = addedData.filter(item => item.isDeleted === true);
    console.log('del data2 :', withDeletedData);
    setNotes(withDeletedData);
  };

  const deleteNoteData = notesId => {
    console.log('note id is', notesId);
    deleteNote(notesId);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={28} color={'white'} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}>
              <Text style={styles.text}>Deleted</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 110}}>
            <Ionicons name="grid-outline" size={27} color={'white'} />
          </View>
        </View>

        <FlatList
          data={notes}
          renderItem={({item}) => (
            <NoteCard item={item} onDelete={() => deleteNoteData(item.id)} />
          )}
          keyExtractor={item => item.id}
        />
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
    flex: 1,
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
    paddingLeft: 100,
    color: 'white',
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

export default DeletedScreen;
