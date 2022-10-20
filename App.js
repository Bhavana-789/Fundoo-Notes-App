import React from 'react';
import {SafeAreaView, StyleSheet, LogBox} from 'react-native';
import {AuthProvider} from './src/navigation/AuthProvider';
//import SignInScreen from './src/screens/SignInScreen';
//import RegistrationScreen from './src/screens/RegistrationScreen';
import Navigation from './src/navigation/index';
import store from './src/redux/store';
import {Provider} from 'react-redux';
LogBox.ignoreLogs([' VirtualizedLists should never be nested']);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.body}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default App;
