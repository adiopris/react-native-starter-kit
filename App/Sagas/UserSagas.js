import {call, put, select} from 'redux-saga/effects';
import UserActions, {UserSelectors} from '../Redux/UserRedux';

export function* login(api, action) {
  const {data} = action;
  const response = yield call(api.login, data);
  if (response.ok) {
    yield put(UserActions.userSuccess(response.data));

  } else {
    let errorMessage = response.data.message;

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

