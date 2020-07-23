import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import generalReducer from '../reducers/general'
import libraryReducer from '../reducers/library'


const supremeReducer = combineReducers({
    general: generalReducer,
    library: libraryReducer,
})

export default createStore(supremeReducer, applyMiddleware(thunk))