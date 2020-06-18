import {call, put, take} from 'redux-saga/effects';
import SocialLoginActions from '../Redux/SocialLoginRedux';
import UserActions from '../Redux/UserRedux';

export function* getSocialLogin(api, action) {
  const {data} = action;
  const response = yield call(api.socialLogin, data);
  if (response.ok) {
    yield put(SocialLoginActions.socialLoginSuccess(response.data));
    yield put(UserActions.userSuccess(response.data));
  } else {
    yield put(SocialLoginActions.socialLoginFailure());
  }
}
