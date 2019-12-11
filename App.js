import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducer';
import { connect } from 'react-redux';
import { setUser } from './Actions';
import types from './Types';
import { bindActionCreators } from 'redux';

import Auth from './Auth';
import AppNavigator from './AppNavigator';

import { auth, firestore } from './firebase'

const store = createStore(reducer);


const boundSetUser = text => store.dispatch(setUser(text))

function formatTime(timestamp) {

  let m = 'am'
  let hour = timestamp.getHours();
  if (hour === 12){
    m = 'pm';
  } else if (hour > 12) {
    hour -= 12
    m = 'pm'
    if (hour === 12) {
      m = 'am'
    }
  }

  let minute = timestamp.getMinutes().toString();
  if (minute.length === 1) {
    minute = '0' + minute;
  }

  const time = hour.toString() + ':' + minute + ' ' + m;
  return time;

}


auth.onAuthStateChanged((user) => {
  console.log("onAuthStateChanged\n\n")
  if (user) {
    console.log("logged in\n\n")
    boundSetUser(user.uid)

    // Fetch items collection
    firestore.collection('notes')
    // Filter items by user ownership (only get the records created by the current user)
    .orderBy("timestamp")
    // Continuously listen for updates to the items query
    .onSnapshot((snapshot) => {
      console.log("SNAPSHOT\n\n")

      const notes = []
      let prevDate = ''
      let count = 0
      let data;
      let timestamp;
      let date;
      let time;

      snapshot.forEach(function(doc) {
        console.log("SNAPSHOT FOR EACH\n\n")
          // doc.data() is never undefined for query doc snapshots
          data = doc.data();
          timestamp = data.timestamp.toDate();

          date = (timestamp.getMonth() + 1).toString() + '-' + timestamp.getDate().toString() + '-' + timestamp.getFullYear().toString()
          time = formatTime(timestamp);
          
          console.log(count, data.owner, user.uid)
          if (data.owner === '') { 

            if (prevDate === date) {
              console.log(count, "prevDate === date", prevDate, date, {time: time, note: data.note, image: data.image})
              notes[notes.length - 1]["data"].push({time: data.timestamp.toDate(), note: dayNotes, image: data.image});

            } else {
              prevDate = date;

              console.log(count, "prevDate !== date", prevDate, date)
              notes.push({title: prevDate, data: [{time: time, note: data.note, image: data.image}] })
            }

            
            /*
              if (date !== prevDate) { 
              
                console.log("prevDate !== ''", {title: prevDate, data: dayNotes})
                notes.push({title: prevDate, data: dayNotes});
              }
              console.log("prevDate = date; dayNotes = []")
                prevDate = date;
                dayNotes = [];
            } 
            console.log("dayNotes.push", {time: time, note: dayNotes, image: data.image})
            dayNotes.push( {time: data.timestamp.toDate(), note: dayNotes, image: data.image})
            
            count++;
            */
          // notes.push({
          //   title: "1-1-19",
          //   data: [ {time: data.timestamp.toDate(), note: data.note, image: data.image}]
          // })
          }
          count++;

      });
      console.log('Notes', notes)
      //store.dispatch('SET_ITEMS', items)



    });
  } else { 
    console.log("signed out.\n\n")
    boundSetUser(types.EMPTY_STRING);
    userID = types.EMPTY_STRING

    console.log('SIGNED OUT\n\n', user);
  }
})

let AuthGate = (props) => {
  console.log('props\n\n')
  if (props.reducer.user === types.EMPTY_STRING) {
    console.log("not logged in\n\n")
    console.log(props)
    return (<Auth/>)
  } else {
    console.log("logged in!!\n\n")
    console.log(props.reducer.user)
    console.log("\n\n")
    return (<AppNavigator />) 
  }
}


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
  console.log("state\n\n")
  console.log(state)
  const { reducer } = state
  return { reducer }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUser,
  }, dispatch)
);

AuthGate = connect(mapStateToProps, mapDispatchToProps)(AuthGate)

export default App;

