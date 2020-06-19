import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  fetchProfileRequest: ['data'],
  fetchProfileSuccess: ['payload'],
  fetchProfileFailure: null,

  saveProfileRequest: ['data'],
  saveProfileSuccess: ['payload'],
  saveProfileFailure: null,

});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: null,
  payload: {},
  error: null,
});

/* ------------- Selectors ------------- */

export const ProfileSelectors = {
  getData: state => state.profile.data,
};

/* ------------- Reducers ------------- */

// FETCH PROFILE

// request the data from an api
export const fetchProfileRequest = (state, {data}) =>
  state.merge({fetching: true, data, payload: null});

// successful api lookup
export const fetchProfileSuccess = (state, action) => {
  const {payload} = action;

  return state.merge({fetching: false, error: false, payload: payload.profile});
};

// Something went wrong somewhere.
export const fetchProfileFailure = state =>
  state.merge({fetching: false, error: true, payload: null});

// SAVE PROFILE

// request the data from an api
export const saveProfileRequest = (state, {data}) =>
  state.merge({fetching: true, data});

// successful api lookup
export const saveProfileSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: null, payload});
};

// Something went wrong somewhere.
export const saveProfileFailure = state =>
  state.merge({fetching: false, error: true});


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PROFILE_REQUEST]: fetchProfileRequest,
  [Types.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
  [Types.FETCH_PROFILE_FAILURE]: fetchProfileFailure,

  [Types.SAVE_PROFILE_REQUEST]: saveProfileRequest,
  [Types.SAVE_PROFILE_SUCCESS]: saveProfileSuccess,
  [Types.SAVE_PROFILE_FAILURE]: saveProfileFailure,
});
