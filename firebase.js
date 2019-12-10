import firebase from 'firebase'
import '@firebase/firestore'
import superSecretKeys from './credentials'
import { setUser } from './Actions';
import { connect } from 'react-redux';



// initialize firebase with loaded configuration
firebase.initializeApp(superSecretKeys);
  
// instance a firebase Firestore connection
const firestore = firebase.firestore()


// Instance a firebase auth session
const auth = firebase.auth()

export { firestore, firebase, auth }