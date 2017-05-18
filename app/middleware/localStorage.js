import * as AuthenticationConstants from '../constants/authentication'
import throttle from 'lodash/throttle'

let saveAuthentication = (authentication) => {
  try {
    const serializedAuthentication = JSON.stringify(authentication);
    localStorage.setItem('token', serializedAuthentication);
  } catch (err) {
    console.error(err)
  }
}

export default store => next => action => {
  if (action.type == AuthenticationConstants.UPDATE_TOKEN) {
    saveAuthentication(action.payload.token)
  }
  return next(action)
}
