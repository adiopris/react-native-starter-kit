import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  photoRequest: ['data'],
  photoSuccess: ['payload'],
  photoFailure: null,
  savePhotoRequest: ['data'],
  savePhotoSuccess: ['payload'],
  savePhotoFailure: null
})

export const PhotoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const PhotoSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

// request the data from an api
export const savePhotoRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const savePhotoSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const savePhotoFailure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PHOTO_REQUEST]: request,
  [Types.PHOTO_SUCCESS]: success,
  [Types.PHOTO_FAILURE]: failure,
  [Types.SAVE_PHOTO_REQUEST]: savePhotoRequest,
  [Types.SAVE_PHOTO_SUCCESS]: savePhotoSuccess,
  [Types.SAVE_PHOTO_FAILURE]: savePhotoFailure
})
