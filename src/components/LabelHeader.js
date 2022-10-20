import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addLabel} from '../services/LabelsFirebaseServices';
import {useDispatch} from 'react-redux';

const LabelHeader = ({dispatchData, route}) => {
  const data = route?.params;

  const navigation = useNavigation();
  const [label, setLabel] = useState('');
  const [cancel, setCancel] = useState(false);
  const [save, setSave] = useState(false);
  const {user} = useContext(AuthContext);

  const onSavePress = () => {
    if (label !== '') {
      addLabel(user.uid, label).then(dispatchData());
      setLabel('');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="cross" size={28} color={'black'} />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Edit Labels</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.input,
          {
            borderColor: cancel ? 'black' : '#e9e9e9',
          },
        ]}>
        {cancel ? (
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setCancel(!cancel);
              setSave(!save);
              setLabel('');
            }}
          />
        ) : (
          <Feather
            //styles={{marginTop: 15}}
            name="plus"
            size={24}
            color="black"
            onPress={() => {
              setCancel(!cancel);
              setSave(!save);
            }}
          />
        )}
        <TextInput
          style={{fontSize: 18}}
          placeholder="Create new label"
          value={label}
          onChangeText={content => setLabel(content)}
          //onFocus={handleFocus}
          //onBlur={handleBlur}
        />
        <View>
          {save ? (
            <MaterialIcons
              style={{marginTop: 15, flex: 1, marginLeft: 180}}
              name="done"
              size={24}
              color="black"
              onPress={() => {
                onSavePress();
              }}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 8,
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'black',
    borderRadius: 20,
  },
  inputContainer: {
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    borderRadius: 0,
    padding: 15,
    opacity: 0.8,
  },
  text: {
    fontSize: 20,
    paddingLeft: 100,
    color: 'black',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  input: {
    flexDirection: 'row',
    height: 65,
    width: '100%',
    marginBottom: 20,
    padding: 2,
    borderWidth: 2,
    marginTop: 15,
    borderColor: 'black',
    alignItems: 'center',
  },
});

export default LabelHeader;
