import responder from "../utils/responder";

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_DONE = 'UPDATE_DONE'

export const MANUAL_UPDATE = 'MANUAL_UPDATE'

export const SORT_DIRECTION_CHANGE = 'SORT_DIRECTION_CHANGE'
export const SORT_FIELD_CHANGE = 'SORT_FIELD_CHANGE'

export const BOOK_SELECT_TO_EDIT = 'BOOK_SELECT_TO_EDIT'
export const BOOK_UNSELECT_TO_EDIT = 'BOOK_UNSELECT_TO_EDIT'

export const update = listToUpdate => {
    return dispatch => {
        dispatch(updateRequest(listToUpdate))
        responder(listToUpdate).then((data) => dispatch(updateDone(data)))
    }
}

const updateRequest = (listToUpdate) => ({
    type: UPDATE_REQUEST,
    payload: {
        listToUpdate: listToUpdate
    }
})

const updateDone = (data) => ({
    type: UPDATE_DONE,
    payload: {
        data: data
    }
})

export const manualUpdate = () => ({
    type: MANUAL_UPDATE,
})

export const sortDirectionChange = (list) => ({
    type: SORT_DIRECTION_CHANGE,
    payload: {
        list:list
    }
})

export const sortFieldChange = (list, key) => ({
    type: SORT_FIELD_CHANGE,
    payload: {
        list:list,
        key: key
    }
})

export const bookSelectToEdit = id => ({
    type: BOOK_SELECT_TO_EDIT,
    payload: {
        id: id
    }
})

export const bookUnselectToEdit = () => ({
    type: BOOK_UNSELECT_TO_EDIT
})