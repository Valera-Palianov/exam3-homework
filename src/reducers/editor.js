import {
    BOOK_SELECT_TO_EDIT,
    BOOK_UNSELECT_TO_EDIT
} from "../actions/LibraryActions"

const initialState = {
    bookEditor: {
        book: {
            id: null,
            title: null,
            info: null,
            authorId: null,
            userId: null
        },
        flags: {
            savingProcess: false,
            savingError: false
        },
        error: {
            message: null,
            description: null
        }
    }
}

const editorReducer = (state = initialState, action) => {
    switch(action.type) {
        case BOOK_SELECT_TO_EDIT:
            return {
                ...state,
                bookEditor: {
                    ...state.bookEditor,
                    book: {
                        ...state.bookEditor.book,
                        ...action.payload.book
                    }
                }
            }
        case BOOK_UNSELECT_TO_EDIT:
            return {
                ...state,
                bookEditor: {
                    book: {
                        id: null,
                        title: null,
                        info: null,
                        authorId: null,
                        userId: null
                    },
                    flags: {
                        savingProcess: false,
                        savingError: false
                    },
                    error: {
                        message: null,
                        description: null
                    }
                }
            }
        default:
            return state
    }
}

export default editorReducer