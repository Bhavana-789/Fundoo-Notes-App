import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AuthProvider} from './src/navigation/AuthProvider';
//import SignInScreen from './src/screens/SignInScreen';
//import RegistrationScreen from './src/screens/RegistrationScreen';
import Navigation from './src/navigation/index';


const App = () => {
  return (
    <SafeAreaView style={styles.body}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default App;
