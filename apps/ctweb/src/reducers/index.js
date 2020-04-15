import { combineReducers } from 'redux'
import userAuth from './userAuth'

const fkReducer = combineReducers({
    userAuth
})

export default fkReducer;