import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext, userId} from '../navigation/AuthProvider';
import NotesBottom from '../components/NotesBottomBar';
import {Chip} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  addNotes,
  updateNote,
  archiveNote,
} from '../services/NotesFirebaseServices';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateModal from '../components/DateModal';

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
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(new Date());

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
  const refRBSheet = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const changeModalVisible = bool => {
    setIsVisible(bool);
  };

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

        <TouchableOpacity
          style={{marginLeft: 10, padding: 6}}
          onPress={() => refRBSheet.current.open()}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color={'#2f4f4f'}
          />
        </TouchableOpacity>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View>
            <TouchableOpacity style={styles.iconView}>
              <MaterialCommunityIcons
                name="alarm"
                color={'black'}
                size={23}
                style={{padding: 0}}
              />
              <Text style={styles.txt}>Tomorrow morning</Text>
              <Text style={styles.timeTxt}>8:00 AM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconView}>
              <MaterialCommunityIcons
                name="alarm"
                color={'black'}
                size={23}
                style={{padding: 0}}
              />
              <Text style={styles.txt}>Tomorrow evening</Text>
              <Text style={styles.timeTxt}>6:00 PM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconView}
              onPress={() => changeModalVisible(true)}>
              <MaterialCommunityIcons
                name="alarm"
                color={'black'}
                size={23}
                style={{padding: 0}}
              />
              <Text style={styles.txt}>Select date and time</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isVisible}
              onRequestClose={() => changeModalVisible(false)}>
              <DateModal changeModalVisible={changeModalVisible} />
            </Modal>
          </View>
        </RBSheet>

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

      {/* {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={'time'}
          is24Hour={true}
          // onChange={onChange}
        />
      )}

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'datetime'}
          is24Hour={true}
          //={() => alert('abcdef')}

          // onChange={onChange}
        />
      )} */}
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
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  txt: {
    color: 'black',
    fontSize: 20,
    marginLeft: 15,
  },
  iconView: {
    borderRadius: 30,
    margin: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 5,
  },
  timeTxt: {
    fontSize: 18,
    color: 'black',
    marginLeft: 'auto',
  },
});

export default NoteScreen;
