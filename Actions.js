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

const setImage = image => (
    {
        type: types.SET_IMAGE,
        setImage: image
    }
)
export { addNote, setNote, setImage }