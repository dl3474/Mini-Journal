import types from './Types'

const addNote = newNote => (
    {
        type: types.ADD_NOTE
    }
)

const setNote = updateNote => (
    {
        type: types.SET_NOTE,
        updateNote: updateNote
    }
)

export { addNote, setNote }