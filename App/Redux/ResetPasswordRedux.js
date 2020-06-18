import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  resetPasswordRequest: ['data'],
  resetPasswordSuccess: ['payload'],
  resetPasswordFailure: ['payload'],
  saveNewPasswordRequest: ['data'],
  saveNewPasswordSuccess: ['payload'],
  saveNewPasswordFailure: ['payload'],
});

export const ResetPasswordTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data    : null,
  fetching: false,
  payload : null,
  error   : false,
});

/* ------------- Selectors ------------- */

export const ResetPasswordSelectors = {
  getData: state => state.resetPassword.payload,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: null, error: false});

// successful api lookup
export const success = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: false, payload});
};

// Something went wrong somewhere.
export const failure = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: true, payload});
};

// request the data from an api
export const saveNewPasswordRequest = (state, {data}) =>
  state.merge({fetching: true, data, payload: null, error: false});

// successful api lookup
export const saveNewPasswordSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: false, payload});
};

// Something went wrong somewhere.
export const saveNewPasswordFailure = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: true, payload});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_PASSWORD_REQUEST]: request,
  [Types.RESET_PASSWORD_SUCCESS]: success,
  [Types.RESET_PASSWORD_FAILURE]: failure,
  [Types.SAVE_NEW_PASSWORD_REQUEST]: saveNewPasswordRequest,
  [Types.SAVE_NEW_PASSWORD_SUCCESS]: saveNewPasswordSuccess,
  [Types.SAVE_NEW_PASSWORD_FAILURE]: saveNewPasswordFailure,
});
