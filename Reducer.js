import { combineReducers } from 'redux';
import types from './Types'


const INITIAL_STATE = {
  note: '',
  notes: [
    {
      title: "10/1/19",
      data: [ {time: 'time', note: 'note!', image: types.EMPTY_IMAGE}, {time: 'time2', note: 'note2!', image: types.EMPTY_IMAGE}, ]
      
    },
    {
      title: "10/2/19",
      data: [ {time: 'time3', note: 'note3!', image: types.EMPTY_IMAGE}, {time: 'time4', note: 'note4!', image: types.EMPTY_IMAGE}, ]
      
    },
  ],
  image: types.EMPTY_IMAGE,
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case types.ADD_NOTE:
      const notes = state.notes;

      const [ date, time ] = new Date().toLocaleString("en-US").split(', ');
      console.log('ADDED NOTE STATE:\t', state.note, date);

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
        console.log('Set NOTE STATE\t', action.updateNote);
        return { ... state, 
                  note: note,
                  };
    
    case types.SET_IMAGE:

      let image = state.image;
      image = action.setImage;
      console.log("SET IMAGE\n\n", action.setImage)
      return {... state, 
              image: image }

    default:
      return state
  }
};

export default combineReducers({
  friends: friendReducer,
});