import { combineReducers } from 'redux'
import apiReducer from '../api/apiSlice'

export default combineReducers({
  api: apiReducer,
})
