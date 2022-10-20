import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deleteNote, updateNote} from '../services/NotesFirebaseServices';
import {onChange} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {updateLabel, deleteLabel} from '../services/LabelsFirebaseServices';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LabelCard = ({item, dispatchData}) => {
  const [value, setValue] = useState(item.label);
  const [trash, setTrash] = useState(false);
  const [done, setDone] = useState(false);
  console.log('+++++++++', item);

  const onDonePress = async () => {
    await updateLabel(value, item);
    // await dispatchData();
    setDone(!done);
    setTrash(!trash);
  };

  return (
    <View
      style={[
        styles.input,
        {
          borderColor: trash ? 'black' : '#e9e9e9',
        },
      ]}>
      {trash ? (
        <AntDesign
          name="delete"
          size={22}
          color={'black'}
          onPress={() => {
            deleteLabel(item.id);
            setTrash(!trash);
            setDone(!done);
          }}
        />
      ) : (
        <MaterialIcons
          name="label-outline"
          size={24}
          color="black"
          onPress={() => {
            setTrash(!trash);
            setDone(!done);
          }}
        />
      )}
      <TextInput
        style={{fontSize: 18}}
        value={value}
        onChangeText={text => setValue(text)}
      />
      {done ? (
        <MaterialIcons
          style={{marginLeft: 'auto', marginRight: 10}}
          name="done"
          size={24}
          color={'blue'}
          onPress={() => {
            onDonePress();
          }}
        />
      ) : (
        <MaterialIcons
          style={{marginLeft: 'auto', marginRight: 10}}
          name="edit"
          size={24}
          color={'black'}
          onPress={() => {
            setDone(!done);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    height: 65,
    width: '100%',
    marginBottom: 1,
    padding: 2,
    borderWidth: 1,
    marginTop: 0,
    borderColor: 'black',
    alignItems: 'center',
  },
  text: {},
});

export default LabelCard;
