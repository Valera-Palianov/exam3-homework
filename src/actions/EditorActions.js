import axios from "axios"

export const BOOK_SELECT_TO_EDIT = 'BOOK_SELECT_TO_EDIT'
export const BOOK_UNSELECT_TO_EDIT = 'BOOK_UNSELECT_TO_EDIT'
export const BOOK_CHANGE = 'BOOK_CHANGE'

export const BOOK_SAVE_REQUEST = 'BOOK_SAVE_REQUEST'

export const MEMBER_SELECT_TO_EDIT = "MEMBER_SELECT_TO_EDIT"
export const MEMBER_UNSELECT_TO_EDIT = "MEMBER_UNSELECT_TO_EDIT"

export const bookSave = () => {
    return (dispatch) => {
        dispatch(bookSaveRequest())
        /*
        const {editor} = getState()
        const book = editor.bookEditor.book

        const  URL = 'http://192.168.99.100:5555/apiV1/book/'+book.id

        axios.patch(URL, book)
            .then((response) => {
                console.log(response);
            });

         */

    }
}

const bookSaveRequest = () => ({
    type: BOOK_SAVE_REQUEST
})

export const bookSelectToEdit = book => ({
    type: BOOK_SELECT_TO_EDIT,
    payload: {
        book: book
    }
})

export const bookUnselectToEdit = () => ({
    type: BOOK_UNSELECT_TO_EDIT
})

export const memberSelectToEdit = member => ({
    type: MEMBER_SELECT_TO_EDIT,
    payload: {
        member: member
    }
})

export const memberUnselectToEdit = () => ({
    type: MEMBER_UNSELECT_TO_EDIT
})

export const bookChange = (name, value) => ({
    type: BOOK_CHANGE,
    payload: {
        name: name,
        value: value
    }
})