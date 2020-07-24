import {
    SELECT_TO_EDIT,
    UNSELECT_TO_EDIT,
    CHANGE,
    SAVE_REQUEST,
    HIDE_OVERLAY,
    SAVE_SUCCESS,
    SAVE_FAILURE
} from "../actions/EditorActions"

const initialState = {
    book: {
        object: {
            id: null
        },
        flags: {
            savingProcess: false,
            savingError: false,
            showOverlay: false
        },
        error: {
            message: null,
            description: null
        }
    },
    member: {
        object: {
            id: null
        },
        flags: {
            savingProcess: false,
            savingError: false,
            showOverlay: false
        },
        error: {
            message: null,
            description: null
        }
    }
}

const editorReducer = (state = initialState, action) => {
    switch(action.type) {
        case SELECT_TO_EDIT:
            const selectEditor = action.payload.editor
            const objectToEdit = action.payload.object

            return {
                ...state,
                [selectEditor]: {
                    ...state[selectEditor],
                    object: {
                        ...objectToEdit
                    }
                }
            }

        case UNSELECT_TO_EDIT:

            const unselectEditor = action.payload.editor

            return {
                ...state,
                [unselectEditor]: {
                    ...state[unselectEditor],
                    object: {id: null,},
                    flags: {
                        ...state[unselectEditor].flags,
                        savingProcess: false,
                        savingError: false
                    },
                    error: {
                        ...state[unselectEditor].error,
                        message: null,
                        description: null
                    }
                }
            }
        case CHANGE:

            const changeEditor = action.payload.editor
            const name = action.payload.name
            let value = action.payload.value
            if(name === 'userId' && value === 'none') value = null

            return {
                ...state,
                [changeEditor]: {
                    ...state[changeEditor],
                    object: {
                        ...state[changeEditor].object,
                        [name]: value
                    }
                }
            }
        case SAVE_REQUEST:

            const saveEditor = action.payload.editor

            return {
                ...state,
                [saveEditor]: {
                    ...state[saveEditor],
                    flags: {
                        ...state[saveEditor].flags,
                        savingProcess: true,
                        savingError: false,
                        showOverlay: true
                    },
                    error: {
                        ...state[saveEditor].error,
                        message: null,
                        description: null
                    }
                }
            }
        case HIDE_OVERLAY:

            const hideEditor = action.payload.editor

            return {
                ...state,
                [hideEditor]: {
                    ...state[hideEditor],
                    flags: {
                        ...state[hideEditor].flags,
                        showOverlay: false
                    }
                }
            }
        case SAVE_SUCCESS:
            const successEditor = action.payload.editor

            return {
                ...state,
                [successEditor]: {
                    ...state[successEditor],
                    flags: {
                        ...state[successEditor].flags,
                        savingProcess: false,
                        savingError: false,
                    },
                    error: {
                        ...state[successEditor].error,
                        message: null,
                        description: null
                    }
                }
            }
        case SAVE_FAILURE:
            const failureEditor = action.payload.editor
            return {
                ...state,
                [failureEditor]: {
                    ...state[failureEditor],
                    flags: {
                        ...state[failureEditor].flags,
                        savingProcess: false,
                        savingError: true,
                    },
                    error: {
                        ...state[failureEditor].error,
                        message: action.payload.message,
                        description: action.payload.description
                    }
                }
            }

        default:
            return state
    }
}

export default editorReducer