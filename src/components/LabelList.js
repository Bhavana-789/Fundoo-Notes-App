import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import LabelHeader from './LabelHeader';
import {fetchLabelData} from '../services/LabelsFirebaseServices';
import CheckBoxCard from './CheckBoxCard';
import {useSelector, useDispatch} from 'react-redux';
import {getLabels} from '../redux/action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
//import { ScrollView } from 'react-native-gesture-handler';
import {updateNote} from '../services/NotesFirebaseServices';

const LabelList = ({navigation, route}) => {
  const [localLabel, setLocalLabel] = useState([]);
  const labels = useSelector(state => state.labels);
  const dispatch = useDispatch();
  console.log('label data is:', route);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchLabels();
      console.log('----------updated');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [fetchLabels, navigation]);

  const fetchLabels = useCallback(async () => {
    let _labels = await fetchLabelData();
    console.log(_labels);
    //setlabels(_labels);
    dispatch(getLabels(_labels));
  }, [dispatch]);

  const updateLabels = labelParam => {
    let {id, isArchived, isDeleted, isPinned, labelsArray, note, title} =
      route.params;
    updateNote(id, title, note, isPinned, isArchived, isDeleted, labelParam);
  };

  const SelectLabel = (value, status) => {
    let _localArray = localLabel;
    if (status) {
      const index = _localArray.indexOf(value);
      if (index === -1) {
        // only splice array when item is found
        _localArray.push(value);
        setLocalLabel(_localArray);
      }
    } else {
      const index = _localArray.indexOf(value);
      if (index > -1) {
        // only splice array when item is found
        _localArray.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setLocalLabel(_localArray);
    updateLabels(_localArray);
    console.log(_localArray);
  };

  // setLocalLabel.filter(function (val) {
  //   let _localArray = localLabel;
  //   return val !== _localArray;
  // });

  //   console.log('value', value);
  //   let _localArray = localLabel;
  //   _localArray.push(value);
  //   setLocalLabel(_localArray);
  //   updateLabels(_localArray);
  // };

  return (
    <View style={{padding: 10, paddingTop: 50}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Ionicons
            name="chevron-back"
            size={38}
            color={'#2f4f4f'}
            style={{marginLeft: -4}}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter label name"
          style={{fontSize: 20, color: 'black', marginLeft: 65}}
        />
      </View>
      {/* <FlatList
        data={labels}
        render={({item}) => <Text>1234</Text>}
        keyExtractor={item => item.id}
      /> */}
      <SafeAreaView>
        <ScrollView>
          {labels.map(item => {
            return (
              <CheckBoxCard
                item={item}
                key={item.id}
                dispatchData={fetchLabels}
                SelectLabel={SelectLabel}
                savedLabel={route.params.labelsArray}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
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
});

export default LabelList;
