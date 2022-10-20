import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataBase = firestore().collection('UserDetails');

export async function addLabel(id, label) {
  let uid = await AsyncStorage.getItem('uid');

  let addedData = null;
  await dataBase
    .doc(uid)
    .collection('labels')
    .add({
      userId: id,
      label,
    })
    .then(() => {
      addedData = true;
      alert('label added succesfully');
    });

  return addedData;
}

export async function fetchLabelData() {
  const list = [];
  let uid = await AsyncStorage.getItem('uid');

  await dataBase
    .doc(uid)
    .collection('labels')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const {userId, label} = doc.data();
        list.push({
          id: doc.id,
          userId,
          label,
        });
        console.log(list);
      });
    })
    .catch(error => {
      console.log('Something went wrong');
    });
  return list;
}

export async function updateLabel(label, labelObject) {
  console.log('label updated', label);
  let uid = await AsyncStorage.getItem('uid');

  await dataBase
    .doc(uid)
    .collection('labels')
    .doc(labelObject.id)
    .update({
      label,
    })
    .then(() => {
      console.log('label updated');
      alert('label added successfully');
    })
    .catch(error => {
      console.log(error);
    });
}

export async function deleteLabel(LabelId) {
  let uid = await AsyncStorage.getItem('uid');
  await dataBase
    .doc(uid)
    .collection('labels')
    .doc(LabelId)
    .delete()
    .then(() => {
      alert('label deleted!');
    })
    .catch(e => {
      console.log(e);
    });
}
