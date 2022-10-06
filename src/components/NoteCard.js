import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteNote, updateNote} from '../services/NotesFirebaseServices';
import {onChange} from 'react-native-reanimated';
//let {width, height} = Dimensions.get('screen');

const NoteCard = ({item, onDelete, layout}) => {
  if (item.isPinned) {
    console.log('item is:', item);
  }

  const onLongClick = () => {
    let {id, isPinned, isArchived, isDeleted, note, title} = item;
    Alert.alert(
      'Alert',
      'Do you want to delete this note?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(),
        },
        {
          text: 'Restore',
          onPress: () =>
            updateNote(id, title, note, isPinned, isArchived, false),
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  };

  const navigation = useNavigation();
  return (
    <View style={{width: layout ? '50%' : '100%'}}>
      <TouchableOpacity
        onLongPress={() => (onDelete ? onLongClick() : null)}
        onPress={() => navigation.navigate('Note', {...item})}>
        <View style={styles.container}>
          <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
            <Text style={layout ? [styles.layoutTitle] : [styles.text]}>
              {item.title}
            </Text>
            {/* <TouchableOpacity onPress={() => onDelete(item)}>
              <AntDesign name="delete" size={20} style={styles.icon} />
            </TouchableOpacity> */}
          </View>
          <Text style={layout ? [styles.layoutNote] : [styles.noteText]}>
            {item.note}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 20,
    borderColor: '#778899',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 3,
    marginBottom: 9,
    fontWeight: 'bold',
    //paddingRight: 280,
    color: '#2f4f4f',
    flex: 1,
  },
  noteText: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 9,
    paddingBottom: 7,
    color: '#2f4f4f',
  },
  icon: {
    marginTop: 8,
  },
  layoutTitle: {
    flex: 1,
    margin: 3,
    fontSize: 16,
    color: '#2f4f4f',
    fontWeight: 'bold',
  },
  layoutNote: {
    flex: 1,
    margin: 3,
    fontSize: 16,
    color: '#2f4f4f',
    fontWeight: 'bold',
  },
});

export default NoteCard;
