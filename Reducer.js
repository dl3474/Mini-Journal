import { combineReducers } from 'redux';
import types from './Types'


const INITIAL_STATE = {
  note: '',
  notes: [
    {
      title: "10/1/2019",
      data: [ {time: '5:30 pm', note: 'Had time and went to the park!', image: types.EMPTY_IMAGE}, {time: '7:40', note: 'Just had dinner with Renne', image: types.EMPTY_IMAGE}, ]
      
    },
    {
      title: "10/2/2019",
      data: [ {time: '9:30 am', note: 'Missed my bus and was late to class', image: types.EMPTY_IMAGE}, {time: '11:30 pm', note: 'Going to bed early today', image: types.EMPTY_IMAGE}, ]
      
    },
  ],
  image: types.EMPTY_IMAGE,
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case types.ADD_NOTE:
      const notes = state.notes;
      let m = 'am'
      const newDate = new Date();
      const date = (newDate.getMonth() + 1).toString() + '/' + newDate.getDate().toString() + '/' + newDate.getFullYear().toString()
      let hour = newDate.getHours() 
      if (hour > 12) {
        hour -= 12
        m = 'pm'
      }
      const time = hour.toString() + ':' + newDate.getMinutes().toString() + ' ' + m

      // console.log('ADDED NOTE STATE:\t', state.note, date);
      console.log(date)
      console.log(new Date().toLocaleString("en-US").split(','))
      console.log(date, time)
      if (notes[notes.length - 1]["title"] != date) {
        notes.push({title: date, data: []})
      }
      notes[notes.length - 1]["data"].push({time: time, note: state.note, image: state.image});
      
      return { ... state, 
                note: '',
                image: types.EMPTY_IMAGE,
                notes: notes};

    case types.SET_NOTE:
        let note = state.note;
        note = action.updateNote;
        // console.log('Set NOTE STATE\t', action.updateNote);
        return { ... state, 
                  note: note,
                  };
    
    case types.SET_IMAGE:

      let image = state.image;
      image = action.setImage;
      // console.log("SET IMAGE\n\n", action.setImage)
      return {... state, 
              image: image }

    default:
      return state
  }
};

export default combineReducers({
  friends: friendReducer,
});