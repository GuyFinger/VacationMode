import loggedUser from './isLogged'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    loggedUser
})

export default allReducers;