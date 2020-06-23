import { call, put } from 'redux-saga/effects'
import Constants from '../Constants';
import {getJwt} from './UserSagas';
import PhotoActions from '../Redux/PhotoRedux'

export function * getPhoto (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(PhotoSelectors.getData)
  // make the call to the api
  const response = yield call(api.getphoto, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PhotoActions.photoSuccess(response.data))
  } else {
    yield put(PhotoActions.photoFailure())
  }
}

export function * savePhoto (api, action) {
  const { data } = action
  const jwt = yield call(getJwt);

  let formData = new FormData();
  formData.append('photo', {
    uri: data.uri.replace('content://', 'file://'),
    name: new Date().getTime() + 'photo.png',
    type: 'image/png'
  });
  const response = yield call(api.savePhoto, {...formData, access_token: jwt, isMultipart: true});
    console.tron.log(response);

  // fetch(Constants.API_URL + 'photo/save', {
  //   headers: {
  //     'Accept': 'application/json; charset=UTF-8',
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': 'Bearer ' + jwt
  //   },
  //   method: 'post',
  //   body: formData
  // }).then(response => {
  //   console.tron.log(response);
  // });

  //
  // // success?
  // if (response.ok) {
  //   yield put(PhotoActions.savePhotoSuccess(response.data))
  // } else {
  //   yield put(PhotoActions.savePhotoFailure())
  // }
}
