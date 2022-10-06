import firestore from '@react-native-firebase/firestore';

export async function fetchnotesData() {
  const list = [];

  await firestore()
    .collection('notes')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const {userId, title, note, isPinned, isArchived, isDeleted} =
          doc.data();
        list.push({
          id: doc.id,
          userId,
          title,
          note,
          isPinned,
          isArchived,
          isDeleted,
        });
      });
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
) {
  let addedData = null;
  await firestore()
    .collection('notes')
    .add({
      userId: id,
      title: title,
      note: note,
      isPinned,
      isArchived,
      isDeleted,
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
) {
  console.log('notesId updated', notesId);

  await firestore()
    .collection('notes')
    .doc(notesId)
    .update({
      title: title,
      note: note,
      isPinned,
      isArchived,
      isDeleted,
    })
    .then(() => {
      console.log('note updated');
    })
    .catch(error => {
      console.log(error);
    });
}
