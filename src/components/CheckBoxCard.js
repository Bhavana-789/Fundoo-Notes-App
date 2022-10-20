/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LabelCard = ({item, dispatchData, SelectLabel, savedLabel}) => {
  const [value, setValue] = useState(item.label);
  const [done, setDone] = useState(false);

  useEffect(() => {
    changeCheckbox();
  }, []);

  const changeCheckbox = () => {
    savedLabel.map(labelItem => {
      if (labelItem === value) {
        setDone(true);
        SelectLabel(value, true);
      }
    });
  };

  return (
    <View style={styles.input}>
      <MaterialIcons name="label-outline" size={24} color="black" />

      <TextInput
        editable={false}
        style={{fontSize: 18, color: 'black'}}
        value={value}
        onChangeText={text => setValue(text)}
      />
      {done ? (
        <Fontisto
          style={{marginLeft: 'auto', marginRight: 10}}
          name="checkbox-active"
          size={24}
          color={'black'}
          onPress={() => {
            setDone(!done);
            SelectLabel(value, false);
          }}
        />
      ) : (
        <Fontisto
          style={{marginLeft: 'auto', marginRight: 10}}
          name="checkbox-passive"
          size={24}
          color={'black'}
          onPress={() => {
            setDone(!done);
            SelectLabel(value, true);
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
    marginTop: 0,
    alignItems: 'center',
  },
  text: {},
});

export default LabelCard;
