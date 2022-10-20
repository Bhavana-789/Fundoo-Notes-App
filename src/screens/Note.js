import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext, userId} from '../navigation/AuthProvider';
import NotesBottom from '../components/NotesBottomBar';
import {Chip} from 'react-native-paper';
import {
  addNotes,
  updateNote,
  archiveNote,
} from '../services/NotesFirebaseServices';

const NoteScreen = ({navigation, route, item}) => {
  const data = route?.params;
  const {user} = useContext(AuthContext);
  console.log('user is', user);

  const [title, setTitle] = useState(data?.title || '');
  const [note, setNote] = useState(data?.note || '');
  const [isPinned, setIsPinned] = useState(data?.isPinned || false);
  const [isArchived, setIsArchived] = useState(data?.isArchived || false);
  const [isDeleted, setIsDeleted] = useState(data?.isDeleted || false);
  const [labelsArray, setLabelsArray] = useState(data?.labelsArray || []);

  const onBackPress = async () => {
    console.log('++++++++++++', isPinned);
    if (title !== '' || note !== '') {
      !data
        ? await addNotes(
            user.uid,
            title,
            note,
            isPinned,
            isArchived,
            isDeleted,
            [],
          )
        : await updateNote(
            data?.id,
            title,
            note,
            isPinned,
            isArchived,
            isDeleted,
            labelsArray,
          );
    }
    navigation.goBack();
  };

  function onPinHandle() {
    setIsPinned(!isPinned);
  }

  function onArchivedHandle() {
    setIsArchived(!isArchived);
  }

  function onDeletedHandle() {
    setIsDeleted(!isDeleted);
  }

  return (
    <View style={{padding: 10, paddingTop: 50, flex: 0.1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onBackPress(isArchived, isPinned, isDeleted)}>
          <Ionicons name="chevron-back" size={35} color={'#2f4f4f'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPinHandle()}
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
          onPress={() => onArchivedHandle()}
          style={{marginLeft: 10, padding: 6}}>
          <Ionicons
            name={isArchived ? 'md-archive' : 'md-archive-outline'}
            size={24}
            color={'#2f4f4f'}
          />
        </TouchableOpacity>
      </View>
      <SafeAreaView>
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
      </SafeAreaView>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        {labelsArray.map(labels => {
          return (
            <View key={labels}>
              <Chip style={styles.chipCard} mode="outlined" elevated={true}>
                {labels}
              </Chip>
            </View>
          );
        })}
      </View>

      <View style={styles.bottomcontainer}>
        <NotesBottom
          navigation={navigation}
          deleteNote={() => onDeletedHandle()}
          data={data}
        />
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
  chipCard: {
    borderWidth: 2,
    margin: 3,
    borderRadius: 20,
  },
});

export default NoteScreen;
