import {
    BOOK_SELECT_TO_EDIT,
    BOOK_UNSELECT_TO_EDIT,
    MEMBER_SELECT_TO_EDIT,
    MEMBER_UNSELECT_TO_EDIT,
    BOOK_CHANGE,
    BOOK_SAVE_REQUEST
} from "../actions/EditorActions"

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
    },
    memberEditor: {
        member: {
            id: null,
            email: null,
            phone: null,
            firstName: null,
            lastName: null,
            books: null
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
            if(state.bookEditor.flags.savingProcess) return state
            const bookToEdit = action.payload.book
            return {
                ...state,
                bookEditor: {
                    ...state.bookEditor,
                    book: {
                        id: bookToEdit.id,
                        title: bookToEdit.title,
                        info: bookToEdit.info,
                        authorId: bookToEdit.authorId,
                        userId: bookToEdit.userId,
                    },
                }
            }
        case MEMBER_SELECT_TO_EDIT:
            if(state.memberEditor.flags.savingProcess) return state
            const memberToEdit = action.payload.member
            return {
                ...state,
                memberEditor: {
                    ...state.memberEditor,
                    member: {
                        id: memberToEdit.id,
                        email: memberToEdit.email,
                        phone: memberToEdit.phone,
                        firstName: memberToEdit.firstName,
                        lastName: memberToEdit.lastName,
                        books: memberToEdit.books
                    },
                }
            }
        case BOOK_UNSELECT_TO_EDIT:
            return {
                ...state,
                bookEditor: {
                    ...state.bookEditor,
                    book: {
                        ...state.bookEditor.book,
                        id: null,
                    },
                    flags: {
                        ...state.bookEditor.flags,
                        savingProcess: false,
                        savingError: false
                    },
                    error: {
                        ...state.bookEditor.error,
                        message: null,
                        description: null
                    }
                }
            }
        case MEMBER_UNSELECT_TO_EDIT:
            return {
                ...state,
                memberEditor: {
                    ...state.memberEditor,
                    member: {
                        ...state.memberEditor.member,
                        id: null,
                    },
                    flags: {
                        ...state.memberEditor.flags,
                        savingProcess: false,
                        savingError: false
                    },
                    error: {
                        ...state.memberEditor.error,
                        message: null,
                        description: null
                    }
                }
            }
        case BOOK_CHANGE:
            const name = action.payload.name
            let value = action.payload.value
            if(name === 'userId' && value === 'none') {
                value = null
            }

            return {
                ...state,
                bookEditor: {
                    ...state.bookEditor,
                    book: {
                        ...state.bookEditor.book,
                        [name]: value
                    }
                }
            }
        case BOOK_SAVE_REQUEST:
            return {
                ...state,
                bookEditor: {
                    ...state.bookEditor,
                    flags: {
                        ...state.memberEditor.flags,
                        savingProcess: true,
                        savingError: false
                    },
                    error: {
                        ...state.memberEditor.error,
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