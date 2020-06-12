import { takeLatest, all } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { StartupTypes } from "../Redux/StartupRedux";
import {UserTypes} from '../Redux/UserRedux';
/* ------------- Sagas ------------- */

import { startup } from "./StartupSagas";
import {login, logout, reset} from './UserSagas';
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(UserTypes.USER_REQUEST, login, api),
    takeLatest(UserTypes.USER_LOGOUT, logout),
    takeLatest(UserTypes.USER_RESET, reset),
  ]);
}
