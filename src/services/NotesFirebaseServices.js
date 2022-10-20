import firestore from '@react-native-firebase/firestore';
import {userId} from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataBase = firestore().collection('UserDetails');

export async function fetchnotesData() {
  const list = [];
  let uid = await AsyncStorage.getItem('uid');

  await dataBase
    .doc(uid)
    .collection('notes')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const {
          userUid,
          title,
          note,
          isPinned,
          isArchived,
          isDeleted,
          labelsArray,
        } = doc.data();
        list.push({
          id: doc.id,
          userUid,
          title,
          note,
          isPinned,
          isArchived,
          isDeleted,
          labelsArray,
        });
      });
    })
    .catch(error => {
      console.log('something went wrong');
    });

  return list;
}

export async function addNotes(
  id,
  title,
  note,
  isPinned,
  isArchived,
  isDeleted,
  labelsArray,
) {
  let uid = await AsyncStorage.getItem('uid');
  let addedData = null;
  await dataBase
    .doc(uid)
    .collection('notes')
    .add({
      userId: id,
      title: title,
      note: note,
      isPinned,
      isArchived,
      isDeleted,
      labelsArray,
    })
    .then(() => {
      addedData = true;
    })
    .catch(error => {
      console.log('Something went wrong');
    });
  return addedData;
}

export async function deleteNote(notesId) {
  let uid = await AsyncStorage.getItem('uid');
  await dataBase
    .doc(uid)
    .collection('notes')
    .doc(notesId)
    .delete()
    .then(() => {
      alert('Note deleted!');
    })
    .catch(e => {
      console.log(e);
    });
}

export async function updateNote(
  notesId,
  title,
  note,
  isPinned,
  isArchived,
  isDeleted,
  labelsArray,
) {
  let uid = await AsyncStorage.getItem('uid');
  console.log('notesId updated', notesId);

  await dataBase
    .doc(uid)
    .collection('notes')
    .doc(notesId)
    .update({
      title,
      note,
      isPinned,
      isArchived,
      isDeleted,
      labelsArray,
    })
    .then(() => {
      console.log('note updated');
    })
    .catch(error => {
      console.log(error);
    });
}
