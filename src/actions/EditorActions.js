export const BOOK_SELECT_TO_EDIT = 'BOOK_SELECT_TO_EDIT'
export const BOOK_UNSELECT_TO_EDIT = 'BOOK_UNSELECT_TO_EDIT'

export const bookSelectToEdit = id => ({
    type: BOOK_SELECT_TO_EDIT,
    payload: {
        id: id
    }
})

export const bookUnselectToEdit = () => ({
    type: BOOK_UNSELECT_TO_EDIT
})