import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class BottomPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {show, closePopup, deleteNote} = this.props;
    return (
      <View>
        <Modal animationType="fade" transparent={true} visible={show}>
          <View style={{flex: 1, backgroundColor: '#000000AA'}}>
            <Pressable
              onPress={() => {
                closePopup();
              }}
              style={{flex: 1}}
            />
            <View style={styles.popup}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => {
                  deleteNote(), closePopup();
                }}>
                <AntDesign
                  name="delete"
                  size={22}
                  color={'black'}
                  style={{padding: 10}}
                />
                <Text style={styles.txt}>Delete</Text>
              </TouchableOpacity>
              <View style={styles.iconView}>
                <MaterialIcons
                  name="label-outline"
                  size={22}
                  color={'black'}
                  style={{padding: 10}}
                />
                <Text style={styles.txt}>Labels</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  popup: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: Dimensions.get('window').height * 0.3,
    maxHeight: Dimensions.get('window').height * 0.4,
  },
  txt: {
    // alignItems: 'center',
    color: 'black',
    fontSize: 20,
    margin: 3,
    //alignSelf: 'auto',
    //alignItems: 'flex-start',
    marginRight: 250,

    //padding: 15,
    //flexDirection: 'row',
  },
  iconView: {
    borderRadius: 30,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 5,
  },
});
