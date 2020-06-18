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

import { call, put } from 'redux-saga/effects'
import ChangePasswordActions from '../Redux/ChangePasswordRedux'
import { getJwt } from './UserSagas'
import  * as NavigationActions  from '../Navigation/RootNavigation'

export function * getChangePassword (api, action) {
  const { data } = action
  const jwt = yield call(getJwt)
  const response = yield call(api.changePassword, {
    ...data,
    access_token: jwt,
  })

  // success?
  if (response.ok) {
    if (response.data.success === true) {
      yield put(ChangePasswordActions.changePasswordSuccess(response.data))
      NavigationActions.navigate('ChangePasswordConfirm');
    } else {
      yield put(ChangePasswordActions.changePasswordFailure(response.data))
    }
  } else {
    yield put(ChangePasswordActions.changePasswordFailure(response.data))
  }
}
