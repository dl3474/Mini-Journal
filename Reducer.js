import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import types from './Types'
import { firestore } from './firebase'



const INITIAL_STATE = {
  image: types.EMPTY_IMAGE,
  note: types.EMPTY_STRING,
  listCollection: [],
  user: types.EMPTY_STRING,
  notes: [
    {
      title: "10/1/2019",
      data: [ {time: '5:30 pm', note: 'Had time and went to the park!', image: types.EMPTY_IMAGE}, {time: '7:40', note: 'Just had dinner with Renne', image: types.EMPTY_IMAGE}, ]
      
    },
    {
      title: "10/2/2019",
      data: [ {time: '9:30 am', note: 'Missed my bus and was late to class', image: types.EMPTY_IMAGE}, {time: '11:30 pm', note: 'Going to bed early today', image: types.EMPTY_IMAGE}, {time: '2:30 am', note: 'Jokes', image: types.EMPTY_IMAGE},]
      
    },
  ],
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
      const newDate = new Date();
      const date = (newDate.getMonth() + 1).toString() + '-' + newDate.getDate().toString() + '-' + newDate.getFullYear().toString()
      let hour = newDate.getHours();
      if (hour === 12){
        m = 'pm';
      } else if (hour > 12) {
        hour -= 12
        m = 'pm'
        if (hour === 12) {
          m = 'am'
        }
      }

      let minute = newDate.getMinutes().toString();
      if (minute.length === 1) {
        minute = '0' + minute;
      }
      const time = hour.toString() + ':' + minute + ' ' + m;
      
      if (notes[notes.length - 1]["title"] != date) {
        notes.push({title: date, data: []})
      }
      notes[notes.length - 1]["data"].push({time: time, note: state.note, image: state.image});
      
      //list of collections in firebase for accessing
      const listCollection = state.listCollection;
      if (!(listCollection.includes(date))) {
        listCollection.push(date);
      }
      
      firestore.collection(date).add({time: time, note: state.note, image: state.image})

      newState = { ... state, 
                note: '',
                image: types.EMPTY_IMAGE,
                listCollection: listCollection,
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
        const items = state.notes
        items = action.updateNotes
        newState = {
            ...state,
            notes: items
        }

        break;


      case types.SET_USER:
        let user = state.user
        user = action.updateUser

        newState = {
            ...state,
            user: user
        }

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