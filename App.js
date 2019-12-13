import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducer';
import { connect } from 'react-redux';
import { setUser, setNotes, setMin } from './Actions';
import types from './Types';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import Auth from './Auth';
import AppNavigator from './AppNavigator';

import { auth, firestore } from './firebase'

const store = createStore(reducer);


const boundSetUser = text => store.dispatch(setUser(text))

const boundSetNotes = notes => store.dispatch(setNotes(notes))

const boundSetMin = min => store.dispatch(setMin(min))


function formatTime(timestamp) {

  let m = 'am'
  let hour = timestamp.getHours();
  console.log(hour)
  if (hour === 12){
    m = 'pm';
  } else if (hour > 12) {
    hour -= 12
    m = 'pm'
    if (hour === 12) {
      hour = 12
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
    .orderBy("timestamp")
    // Continuously listen for updates to the items query
    .onSnapshot((snapshot) => {
      console.log("SNAPSHOT\n\n")

      const notes = []
      let prevDate = types.EMPTY_STRING

      snapshot.forEach(function(doc) {
        console.log("SNAPSHOT FOR EACH\n\n", doc.data())
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          let timestamp = data.timestamp.toDate();

          let date = (timestamp.getMonth() + 1).toString() + '-' + timestamp.getDate().toString() + '-' + timestamp.getFullYear().toString()
          let time = formatTime(timestamp);
          
          if (data.owner === user.uid) { 

            if (prevDate === date) {
              notes[notes.length - 1]["data"].push({timestamp: time, note: data.note, image: data.image});

            } else {
              if (prevDate === types.EMPTY_STRING){
                boundSetMin(date);
                console.log(date)
              }
              prevDate = date;

              notes.push({title: prevDate, data: [{timestamp: time, note: data.note, image: data.image}] })
            }

          }

      });
      console.log('Notes\n\n', notes)
      boundSetNotes(notes);
      //store.dispatch('SET_ITEMS', items)



    });
  } else { 
    console.log("signed out.\n\n")
    boundSetUser(types.EMPTY_STRING);

  }
})

let AuthGate = (props) => {
  console.log('props\n\n')
  console.log(props)
  if (props.reducer.user === types.EMPTY_STRING) {
    console.log("not logged in\n\n")
    return (<Auth/>)
  } else {
    console.log("authgate---- logged in!!\n\n")
    return (<AppNavigator />) 
  }
}

class App extends React.Component {
  
  render() {
    return (
      <Provider store={ store } >
        <View style={{paddingTop: 45, flex: 1, backgroundColor: '#CE9DD9'}}>
          <AuthGate />

        </View>
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

AuthGate = connect(mapStateToProps, mapDispatchToProps)(AuthGate)

export default App;

