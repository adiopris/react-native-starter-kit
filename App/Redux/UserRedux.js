import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {isEmpty} from 'lodash';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  userRequest: ['data'],
  userSuccess: ['payload'],
  userFailure: ['payload'],
  userLogout: null,
  userReset: null,
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: {},
  error: false,
});

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getJwt: state => {
    if (!state.user.payload) {
      return null;
    }
    return state.user.payload.success.token;
  },
  isGuest: state => {
    return isEmpty(state.user.payload) || state.user.error;
  },
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: {}, error: false});

// successful api lookup
export const success = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: false, payload});
};

// Something went wrong somewhere.
export const failure = (state, action) => {
  const {payload} = action;
  let payloadWithError = {...state.payload, error:payload};
  return state.merge({fetching: false, error: true, payload: payloadWithError});
};
// Logout
export const logout = state => state.merge({data: null, payload: {}, error: false});
export const reset = state => {
 return state.merge({data: null, payload: {}, error: false});
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.USER_LOGOUT]: logout,
  [Types.USER_RESET]: reset,
});
