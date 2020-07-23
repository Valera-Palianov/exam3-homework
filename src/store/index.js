import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import generalReducer from '../reducers/general'
import libraryReducer from '../reducers/library'
import editorReducer from "../reducers/editor";


const supremeReducer = combineReducers({
    general: generalReducer,
    library: libraryReducer,
    editor: editorReducer
})

export default createStore(supremeReducer, applyMiddleware(thunk))