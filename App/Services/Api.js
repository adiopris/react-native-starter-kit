// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import qs from 'qs'
import Constants from '../Constants'
// our "constructor"
const create = (baseURL = Constants.API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  api.addRequestTransform(req => {
    if (req.method === 'post') {
      req.headers['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8';

      if(req.data.access_token !== undefined) {
        req.headers.Authorization = 'Bearer ' + req.data.access_token
      }

      req.data = qs.stringify(req.data)
    }
    return req
  });
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = data => api.post('auth/login', data)
  const register = data => api.post('auth/register', data)
  const socialLogin = data => api.post('auth/social-login', data)
  const socialRegister = data => api.post('auth/social-register', data)
  const reset_password = data => api.post('auth/forgot-password', data.email)
  const save_new_password = data => api.post('auth/password/reset', data)
  const changePassword = data => api.post('user/change-password', data)
  const fetchProfile = data => api.get('user/profile/' + data.success.id)
  const saveProfile = data => api.post('user/profile/' + data.user_id , data)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    register,
    socialRegister,
    socialLogin,
    reset_password,
    save_new_password,
    changePassword,
    fetchProfile,
    saveProfile
  }
}

// let's return back our create method as the default.
export default {
  create
}
