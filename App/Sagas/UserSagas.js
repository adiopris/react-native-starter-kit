import {call, put, take, select} from 'redux-saga/effects';
import UserActions, {UserSelectors, UserTypes} from '../Redux/UserRedux';
import ProfileActions, {ProfileTypes} from '../Redux/ProfileRedux'

export function* login(api, action) {
  const {data} = action;
  const response = yield call(api.login, data);
  console.tron.log('USER_REQUEST_RESPONSE', response);
  if (response.ok) {
    yield put(UserActions.userSuccess(response.data));

    yield put(ProfileActions.fetchProfileRequest(response.data));
    yield take(ProfileTypes.FETCH_PROFILE_SUCCESS);
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
export function* getUserId() {
  return yield select(UserSelectors.getUserId);
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
