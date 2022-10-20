import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();
export let userId = '';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const db = firestore();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            const userDetails = await auth().signInWithEmailAndPassword(
              email,
              password,
            );

            userId = userDetails.user.uid;
            await AsyncStorage.setItem('uid', userDetails.user.uid);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            const userDetails = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            db.collection('UserDetails')
              .doc(userDetails.user.uid)
              .set({email: email});
            userId = userDetails.user.uid;
            await AsyncStorage.setItem('uid', userDetails.user.uid);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            await AsyncStorage.clear();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
