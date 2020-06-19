import {call, put, take, select} from 'redux-saga/effects';
import UserActions, {UserSelectors, UserTypes} from '../Redux/UserRedux';

export function* login(api, action) {
  const {data} = action;
  const response = yield call(api.login, data);

  if (response.ok) {
    yield put(UserActions.userSuccess(response.data));
  } else {
    let errorMessage = response.data.error;

    if(response.status === 500){
      errorMessage = 'System failure';
    }

    yield put(UserActions.userFailure(errorMessage));
  }
}

export function* getJwt() {
  return yield select(UserSelectors.getJwt);
}
export function* logout() {}
export function* reset() {}
export function* changePassword(api, action) {
  const {data} = action;

  const jwt = yield call(getJwt);
  const response = yield call(api.changePassword, {
    ...data,
    access_token: jwt,
  });

  // success?
  if (response.ok) {
    yield put(UserActions.changePasswordSuccess(response.data));
  } else {
    yield put(UserActions.changePasswordFailure(response.data));
  }
}
