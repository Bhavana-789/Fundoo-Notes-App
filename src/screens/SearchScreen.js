import * as React from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, TextInput} from 'react-native';
//import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');
  
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Search your notes" />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
     height: '10%',
     margin: '2%',
     alignItems: 'center',
     flexDirection: 'row',
    },
    input: {
      fontSize: 18,
      color: 'black',
    },
})

export default SearchScreen;