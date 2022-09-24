import firestore from '@react-native-firebase/firestore';

export async function fetchnotesData() {
  const list = [];

  await firestore()
    .collection('notes')
    .get()
    .then(querySnapshot => {
      //console.log('Total notes: ', querySnapshot.size);

      querySnapshot.forEach(doc => {
        const {userId, title, note} = doc.data();
        list.push({
          id: doc.id,
          userId,
          title,
          note,
        });
      });
    });
  return list;
}

export async function addNotes(id, title, note, isPinned) {
  let addedData = null;
  await firestore()
    .collection('notes')
    .add({
      userId: id,
      title: title,
      note: note,
      isPinned,
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
  await firestore()
    .collection('notes')
    .doc(notesId)
    .delete()
    .then(() => {
      console.log('note deleted!');
    })
    .catch(e => {
      console.log(e);
    });

  await firestore()
    .collection('notes')
    .doc(notesId)
    .delete()
    .then(() => {
      console.log('note deleted');
    });
}

export async function updateNote(notesId, title, note) {
  await firestore()
    .collection('notes')
    .doc(notesId)
    .update({
      title: title,
      note: note,
    })
    .then(() => {
      console.log('note updated');
    })
    .catch(error => {
      console.log(error);
    });
}
