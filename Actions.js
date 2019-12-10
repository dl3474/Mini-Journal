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

const setNotes = updateNotes => (
    {
        type: types.SET_NOTES,
        updateNotes: updateNotes
    }
)

const setUser = updateUser => (
    {
        type: types.SET_USER,
        updateUser: updateUser
    }
)

export { addNote, setNote, setImage, setNotes, setUser }