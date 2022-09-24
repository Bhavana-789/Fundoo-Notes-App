import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NoteCard = ({item, onDelete}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Note',{...item})}>
      <View style={styles.container}>
        <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
          <Text style={styles.text}>{item.title}</Text>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
          <AntDesign name="delete" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.noteText}>{item.note}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 20,
    borderColor: '#778899',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 3,
    marginBottom: 9,
    fontWeight: 'bold',
    paddingRight: 210,
  },
  noteText: {
    fontSize: 16,
    marginTop: 3,
    marginBottom: 9,
    paddingBottom: 7,
  },
  icon: {
    marginTop: 8,
  },
});

export default NoteCard;
