import {call, put} from 'redux-saga/effects';
import ResetPasswordActions from '../Redux/ResetPasswordRedux';
import * as RootNavigation from '../Navigation/RootNavigation';

export function* resetPassword(api, action) {
  const {data} = action;
  const response = yield call(api.reset_password, data);
  if (response.ok) {
    yield put(ResetPasswordActions.resetPasswordSuccess(response.data));
    RootNavigation.navigate('ResetPasswordConfirm', {action: 'close', message: response.data.message});
  } else {
    let message = '';
    if(response.data && response.data.message){
      message = response.data.message;
    }
    yield put(ResetPasswordActions.resetPasswordFailure());
    RootNavigation.navigate('ResetPasswordConfirm', {action: 'close', message: message});
  }
}
export function* saveNewPassword(api, action) {
  const {data} = action;
  const response = yield call(api.save_new_password, data);
  if (response.ok) {
    yield put(ResetPasswordActions.resetPasswordSuccess(response.data));
    RootNavigation.navigate('ResetPasswordConfirm', {action: 'login', message: response.data.message});
  } else {
    let message = '';
    if(response.data && response.data.message){
      message = response.data.message;
    }
    yield put(ResetPasswordActions.resetPasswordFailure());
    RootNavigation.navigate('ResetPasswordConfirm', {action: 'close', message: message});
  }
}
