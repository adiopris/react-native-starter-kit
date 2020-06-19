/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import {call, put, select, take} from 'redux-saga/effects'
import ProfileActions from '../Redux/ProfileRedux'
import {getJwt, getUserId} from './UserSagas';
import {Alert} from 'react-native';
import * as RootNavigation from '../Navigation/RootNavigation';
import Constants from "../Constants";


export function* fetchProfile(api, action) {
  const {data} = action;
  const jwt = yield call(getJwt);

  // get current data from Store
  // const currentData = yield select(ProfileSelectors.getData)
  // make the call to the api
  const response = yield call(api.fetchProfile, {...data, access_token: jwt});

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ProfileActions.fetchProfileSuccess(response.data));
  } else {
    yield put(ProfileActions.fetchProfileFailure());
  }
}

export function* saveProfile(api, action) {
  const {data} = action;
  const jwt = yield call(getJwt);
  const user_id = yield call(getUserId);
  const response = yield call(api.saveProfile, {...data, access_token: jwt, user_id: user_id});
  if (response.ok) {
    yield put(ProfileActions.saveProfileSuccess(response.data));
    Alert.alert(null, response.data.message);
    if(response.data.success === true) {
      RootNavigation.navigate('Launch');
    }
  } else {
    yield put(ProfileActions.saveProfileFailure());
  }
}

