const RESET_API_REQUEST_STATE = 'RESET_API_REQUEST_STATE'
const UPDATE_FETCHING_STATUS = 'UPDATE_FETCHING_STATUS'
const LOAD_ERRORS = 'LOAD_ERRORS'
const DELETE_ERRORS = 'DELETE_ERRORS'

const initialState = {
  fetching: false,
  errors: null,
}

function apiRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_API_REQUEST_STATE:
      return Object.assign({}, initialState)
    case UPDATE_FETCHING_STATUS:
      return Object.assign({}, state, { fetching: action.payload })
    case LOAD_ERRORS:
      return Object.assign({}, state, { errors: action.payload })
    case DELETE_ERRORS:
      return Object.assign({}, state, { errors: null })
    default:
      return state
  }
}

export default apiRequestsReducer

export function resetAPIRequestState() {
  return {
    type: RESET_API_REQUEST_STATE
  }
}
export function updateFetchingStatus(bool) {
  return {
    type: UPDATE_FETCHING_STATUS,
    payload: bool
  }
}

export function loadErrors(errors) {
  return {
    type: LOAD_ERRORS,
    payload: errors
  }
}

export function deleteErrors() {
  return {
    type: DELETE_ERRORS
  }
}
