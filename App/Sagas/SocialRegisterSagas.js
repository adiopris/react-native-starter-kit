import {call, put, take} from 'redux-saga/effects';
import SocialRegisterActions from '../Redux/SocialRegisterRedux';
import UserActions from '../Redux/UserRedux';

export function* getSocialRegister(api, action) {
  const {data} = action;
  const response = yield call(api.socialRegister, data);
  if (response.ok) {
    yield put(SocialRegisterActions.socialRegisterSuccess(response.data));
    yield put(UserActions.userSuccess(response.data));
  } else {
    yield put(SocialRegisterActions.socialRegisterFailure());
  }
}
