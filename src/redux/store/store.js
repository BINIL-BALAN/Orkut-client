import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {profileReducer} from '../reducers/profileReducer'
const middleware = [thunk]

const reducers = combineReducers({
    profileDetais:profileReducer
})

export const store = createStore(reducers,applyMiddleware(...middleware))
