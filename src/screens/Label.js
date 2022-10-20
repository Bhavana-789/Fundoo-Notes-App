import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import LabelHeader from '../components/LabelHeader';
import {fetchLabelData} from '../services/LabelsFirebaseServices';
import LabelCard from '../components/LabelCard';
import {useSelector, useDispatch} from 'react-redux';
import {getLabels} from '../redux/action';
//import { ScrollView } from 'react-native-gesture-handler';

const LabelScreen = ({navigation}) => {
  //const [labels, setlabels] = useState([]);
  const labels = useSelector(state => state.labels);
  const dispatch = useDispatch();
  console.log('label data is:', labels);

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

  return (
    <View>
      <LabelHeader dispatchData={fetchLabels} />
      {/* <FlatList
        data={labels}
        render={({item}) => <Text>1234</Text>}
        keyExtractor={item => item.id}
      /> */}
      <ScrollView>
        {labels.map(item => {
          return (
            <LabelCard item={item} key={item.id} dispatchData={fetchLabels} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LabelScreen;
