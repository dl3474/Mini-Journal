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

const setMin = updateMin => (
    {
        type: types.SET_MIN,
        updateMin: updateMin
    }
)

const setName = updateName => (
    {
        type: types.SET_NAME,
        updateName: updateName
    }
)


const addImage = image => (
    {
        type: types.ADD_IMAGE,
        addImage: image
    }
)




export { addNote, setNote, setImage, setNotes, setUser, setMin, setName } 