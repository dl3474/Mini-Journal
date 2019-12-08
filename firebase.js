import firebase from 'firebase'
import '@firebase/firestore'
import superSecretKeys from './credentials'


// initialize firebase with loaded configuration
firebase.initializeApp(superSecretKeys);
  
// instance a firebase Firestore connection
const firestore = firebase.firestore()


// Instance a firebase auth session
const auth = firebase.auth()

// var provider = new firebase.auth.FacebookAuthProvider();
/*

auth.onAuthStateChanged((user) => {
    fluxStore.dispatch('AUTH', user)
    console.log('HERE');
    // console.log('USER', user)
    if (user) {
      console.log('USER', user)
      // User is signed in.
      var displayName = user.displayName;
      console.log("HELLO " + displayName)

      
      // ...
    } else { //user is null
      // User is signed out.
      fluxStore.dispatch('LOGOUT')
      console.log('SIGNED OUT\n\n', user);
      auth.signOut();
      console.log('WE GONEZO\n');
    }
  })
  */

  
export { firestore, firebase, auth }