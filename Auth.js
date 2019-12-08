import firebase from './firebase'
import * as Facebook from 'expo-facebook';
import React from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';




async function logIn() { 
try {
  const appId = "2545626589042405";
  const permissions = ['public_profile'];  // Permissions required, consult Facebook docs
  
  const {
    type,
    token,
  } = await Facebook.logInWithReadPermissionsAsync(
    appId,
    {permissions}
  );

  switch (type) {
    case 'success': {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

      // Do something with Facebook profile data
      // OR you have subscribed to auth state change, authStateChange handler will process the profile data
      
      return Promise.resolve({type: 'success'});
    }
    case 'cancel': {
      return Promise.reject({type: 'cancel'});
    }
  }
  
} catch(err) {
    console.log('ERROR', err);
  }
}
class Auth extends React.Component {
    render() {
      return (
      <Button
      onPress={() => {logIn()}}
      title="Login with Facebook"
      />
      )
  
    }
  }

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};
  
export default connect(mapStateToProps)(Auth);