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

export async function addNotes(id, title, note) {
  let response = null;
  await firestore()
    .collection('notes')
    .add({
      userId: id,
      title: title,
      note: note,
    })
    .then(() => {
      response = true;
    })
    .catch(error => {
      console.log('Something went wrong');
    });
  return response;
}
