import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';

const WIDTH = Dimensions.get('window').width;

const DateModal = ({changeModalVisible}) => {
  const todaysDate = new Date();
  const [date, setDate] = useState(todaysDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  // const [showTime, setShowTime] = useState(false);
  //const [showDate, setShowDate] = useState(false);
  // const [time, setTime] = useState();
  // const [selectTime, setSelectTime] = useState(false);
  //const [selectDate, setSelectDate] = useState(false);

  console.log(moment().format('DD-MM-YY'));

  const onChange = (selectedDate, tDate) => {
    console.log('=======', selectedDate.nativeEvent.timestamp);
    console.log('++++++++', tDate);
    const currentDate = selectedDate.nativeEvent.timestamp;

    //   const [birthDate, setBirthDate] = useState(new Date());
    //   const [show, showModal] = useState(false);
    //   const toggle = () => showModal(!show);
    //   return (
    //     <DateTimePickerModal
    //       value={birthDate}
    //       onChange={(event, date) => setBirthDate(date)}
    //       show={show}
    //       toggle={toggle}
    //     >
    //       <Text>Birth Day</Text>
    //       <Text>
    //         {birthDate ? moment(birthDate).format('MMMM DD, YYYY') : '-'}
    //       </Text>
    //     </DateTimePickerModal>
    //   );
    // }

    //setShow(Platform.OS === 'android');
    //setDate(currentDate);

    //   let dateMoment = moment().format('MMMM Do YYYY, h:mm:ss a');
    //   setText(dateMoment);
    //   console.log('date and tme is', dateMoment);
    // };

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    let fTime =
      'Hours' + tempDate.getHours() + '|Minutes' + tempDate.getMinutes();

    console.log(fDate + '(' + fTime + ')');
    setText(fDate, fTime);
    setShow(false);
    setDate(tempDate);
  };

  // const showMode = currentMode => {
  //   if (Platform.OS === 'android') {
  //     setShow(false);
  //     // for iOS, add a button that closes the picker
  //   }
  //   setMode(currentMode);
  // };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            //onTouchCancel={() => console.log('chdcjfrj')}
          />
        )}

        <View style={styles.txtView}>
          <Text style={styles.txt}>Add reminder</Text>
          <TouchableOpacity onPress={() => showMode('date')}>
            <Text style={{fontSize: 16, color: 'black'}}>Select date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMode('time')}>
            <Text style={{fontSize: 16, color: 'black'}}>Select time</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16, color: 'black'}}>{text}</Text>
          <View style={{flexDirection: 'row', paddingTop: 40}}>
            <Button onPress={() => changeModalVisible(false)}>Cancel</Button>
            <Button mode="contained">Save</Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: WIDTH - 40,
    height: 200,
    paddingTop: 0,
    marginTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 20,
    padding: 10,
    borderRadius: 4,
  },
  txtView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  txt: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
});

export default DateModal;
