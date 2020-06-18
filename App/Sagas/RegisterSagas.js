import {call, put} from 'redux-saga/effects';
import RegisterActions from '../Redux/RegisterRedux';
import * as RootNavigation from '../Navigation/RootNavigation';
import Constants from '../Constants';

export function* register(api, action) {
  const {data} = action;
  const response = yield call(api.register, data);

  if (response.ok) {
    yield put(RegisterActions.registerSuccess(response.data));
    RootNavigation.navigate('Login', {
      needsToBeActivated: response.data.status === Constants.USER_STATUS_NOT_ACTIVE
    });
  } else {
    yield put(RegisterActions.registerFailure(response.data.message));
  }
}
