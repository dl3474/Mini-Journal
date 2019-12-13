import {auth, firebase} from './firebase'
import * as Facebook from 'expo-facebook';
import React from 'react'
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


async function logIn() { 
//try {

  const appId = Expo.Constants.manifest.extra.facebook.appId;
  const permissions = ['public_profile'];  // Permissions required, consult Facebook docs
  console.log(appId)
  const {
    type,
    token,
  } = await Facebook.logInWithReadPermissionsAsync(
    appId,
    {permissions}
  );
  
  console.log("type", type, "token", token)

  switch (type) {
    case 'success': {
      console.log('SUCCESS')
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await auth.signInWithCredential(credential);  // Sign in with Facebook credential

      // Do something with Facebook profile data
      // OR you have subscribed to auth state change, authStateChange handler will process the profile data
      
      return Promise.resolve({type: 'success'});
    }
    case 'cancel': {
      console.log('CANCEL')
      
      return Promise.reject({type: 'cancel'});
    }
  }
  
  
}

class Auth extends React.Component {
    render() {
      return (
        <View style={{alignSelf: 'center'}}>
          <Button
            style={{margin: 20}}
            onPress={() => {logIn()}}
            title="Login with Facebook"
          />
      </View>
      )
  
    }
  }

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};
  
export default connect(mapStateToProps)(Auth);