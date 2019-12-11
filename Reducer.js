import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import types from './Types'
import { Timestamp, firestore, firebase } from './firebase'

const newDate = new Date();


const INITIAL_STATE = {
  image: types.EMPTY_IMAGE,
  note: types.EMPTY_STRING,
  user: types.EMPTY_STRING,
  notes: [
    {
      title: "10/1/2019",
      data: [ {timestampstamp: '5:30 pm', note: 'Had time and went to the park!', image: types.EMPTY_IMAGE}, {timestamp: '7:40', note: 'Just had dinner with Renne', image: types.EMPTY_IMAGE}, ]
      
    },
    {
      title: "10/2/2019",
      data: [ {timestampstamp: '9:30 am', note: 'Missed my bus and was late to class', image: types.EMPTY_IMAGE}, {timestamp: '11:30 pm', note: 'Going to bed early today', image: types.EMPTY_IMAGE}, {timestamp: '2:30 am', note: 'Jokes', image: types.EMPTY_IMAGE},]
      
    },
  ],
  currentDate: newDate.getFullYear().toString() + '-' + (newDate.getMonth() + 1).toString() + '-' + newDate.getDate().toString(),
  minDate: types.EMPTY_STRING
};


function saveToLocalStorage(state) {
  AsyncStorage.setItem("STATE", JSON.stringify(state))
}

const reducer = (state = INITIAL_STATE, action) => {
  
  let newState;
  
  switch (action.type) {

    case types.ADD_NOTE:

      //formatting data and time
      const notes = state.notes;
      let m = 'am'
      const date = (newDate.getMonth() + 1).toString() + '-' + newDate.getDate().toString() + '-' + newDate.getFullYear().toString()
      let hour = newDate.getHours();
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

      let minute = newDate.getMinutes().toString();
      if (minute.length === 1) {
        minute = '0' + minute;
      }
      const time = hour.toString() + ':' + minute + ' ' + m;
      
      if (notes.length === 0 || notes[notes.length - 1]["title"] != date) {
        notes.push({title: date, data: []})
      }
      notes[notes.length - 1]["data"].push({timestampstamp: time, note: state.note, image: state.image});

      firestore.collection("notes").add({owner: state.user, timestamp: firebase.firestore.Timestamp.fromDate(new Date()), note: state.note, image: state.image})

      newState = { ... state, 
                note: types.EMPTY_STRING,
                image: types.EMPTY_IMAGE,
                notes: notes};
      
      break;

    case types.SET_NOTE:
        let note = state.note;
        note = action.updateNote;
        newState = { ... state, 
                  note: note,
                  };

        break;
    
    case types.SET_IMAGE:

      let image = state.image;
      image = action.setImage;
      newState = {... state, 
              image: image }

      break;
    
      
      case types.SET_NOTES:
        let _notes = state.notes
        _notes = action.updateNotes

        newState = {
            ...state,
            notes: _notes
        }

        break;


      case types.SET_USER:
        let user = state.user
        user = action.updateUser
        //!!!!
        firestore.collection("users").add({userID: user})
        
        newState = {
            ...state,
            user: user
        }

        break;

        case types.SET_MIN:
          let min = state.minDate;
          min = action.updateMin;
          newState = { ... state, 
                    minDate: min,
                    };
  
          break;
        
    default:
        newState = state
        break;
  }

  saveToLocalStorage(newState)
  return newState;

};

export default combineReducers({
  reducer: reducer,
});