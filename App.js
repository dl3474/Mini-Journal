import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducer';
import { connect } from 'react-redux';
import { setUser } from './Actions';
import types from './Types';

import Auth from './Auth';
import AppNavigator from './AppNavigator';

import { auth } from './firebase'

const store = createStore(reducer);


const boundSetUser = text => store.dispatch(setUser(text))

let userID = types.EMPTY_STRING;

auth.onAuthStateChanged((user) => {
  console.log("onAuthStateChanged\n\n")
  if (user) {
    console.log("logged in\n\n")
    userID = user.uid;
    boundSetUser(user.uid)
    // User is signed in.
    var displayName = user.displayName;
    
  } else { 
    console.log("signed out.\n\n")
    boundSetUser(types.EMPTY_STRING);
    userID = types.EMPTY_STRING

    console.log('SIGNED OUT\n\n', user);
  }
})

let AuthGate = (props) => {
  console.log('props\n\n')
  if (props.user === types.EMPTY_STRING) {
    console.log("no user\n\n")
    console.log(props)
    return (<Auth/>)
  } else {
    console.log("user here!!\n\n")
    console.log(props)
    return (<AppNavigator />) 
  }
}

AuthGate = connect(mapStateToProps)(AuthGate)

/*
auth.onAuthStateChanged((user) => {
    // Check that a user is logged in
    if (user) {
      // Store user details in flux store
      store.dispatch('AUTH', user)

      // Fetch items collection
      firestore.collection('items')
      // Filter items by user ownership (only get the records created by the current user)
      .where("owner", "==", user.uid)
      // Continuously listen for updates to the items query
      .onSnapshot((snapshot) => {
        const items = []
        snapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            items.push({...doc.data(), id: doc.id})
        });
        console.log('data', items)
        store.dispatch('SET_ITEMS', items)
      });
      
    }
})

*/
class App extends React.Component {
  
  render() {
    return (
      <Provider store={ store } >
        <AuthGate />
      </Provider>
    );
  }
}


const mapStateToProps = (state) => {
  const { reducer } = state
  return { reducer }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUser,
  }, dispatch)
);


export default App;

