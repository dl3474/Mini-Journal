import { combineReducers } from 'redux';
import types from './Types'

const INITIAL_STATE = {
  note: '',
  notes: [],
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case types.ADD_NOTE:
      const notes = state.notes;
      notes.push(state.note);
      console.log('ADDED NOTE STATE:\t', state.note);
      return { ... state, 
                note: '',
                notes: notes};

    case types.SET_NOTE:
        let note = state.note;
        note = action.updateNote;
        console.log('Set NOTE STATE\t', action.updateNote);
        return { ... state, 
                  note: note,
                  };





    default:
      return state
  }
};

export default combineReducers({
  friends: friendReducer,
});