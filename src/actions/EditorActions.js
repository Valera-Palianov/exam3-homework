import patcher from "../utils/patcher"
import {manualUpdate} from "./LibraryActions";

export const UNSELECT_TO_EDIT = 'UNSELECT_TO_EDIT'
export const SAVE_REQUEST = 'SAVE_REQUEST'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAILURE = 'SAVE_FAILURE'
export const SELECT_TO_EDIT = 'SELECT_TO_EDIT'
export const CHANGE = 'CHANGE'
export const HIDE_OVERLAY = 'HIDE_OVERLAY'

export const save = (editor) => {
    return (dispatch, getState) => {
        dispatch(saveRequest(editor))

        const state = getState()
        const object = state.editor[editor].object
        const toSave = {
            id: object.id,
            editor: editor,
            object: object
        }

        patcher(toSave).then(res => {
            if(res.status === 'ok') {
                dispatch(saveSuccess(editor))
                setTimeout(() => {
                    dispatch(hideOverlay(editor))
                    dispatch(unselectToEdit(editor))
                    dispatch(manualUpdate())
                }, 1500)
            } else {
                dispatch(saveFailure(editor, res.message, res.description))
                setTimeout(() => {
                    dispatch(hideOverlay(editor))
                }, 3000)
            }
        })

    }
}

const hideOverlay = (editor) => ({
    type: HIDE_OVERLAY,
    payload: {
        editor: editor
    }
})

const saveSuccess = (editor) => ({
    type: SAVE_SUCCESS,
    payload: {
        editor: editor
    }
})

const saveFailure = (editor, message, description) => ({
    type: SAVE_FAILURE,
    payload: {
        editor: editor,
        message: message,
        description: description
    }
})

const saveRequest = (editor) => ({
    type: SAVE_REQUEST,
    payload: {
        editor: editor
    }
})

export const selectToEdit = (editor, object) => ({
    type: SELECT_TO_EDIT,
    payload: {
        editor: editor,
        object: object
    }
})

export const unselectToEdit = (editor) => ({
    type: UNSELECT_TO_EDIT,
    payload: {
        editor: editor
    }
})

export const change = (editor, name, value, validation) => ({
    type: CHANGE,
    payload: {
        editor: editor,
        name: name,
        value: value,
        validation: validation
    }
})