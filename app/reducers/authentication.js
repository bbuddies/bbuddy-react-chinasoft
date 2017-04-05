import merge from 'lodash/merge'
import throttle from 'lodash/throttle'
import * as AuthenticationConstants from '../constants/authentication'

let saveAuthentication = (authentication) => {
  return throttle(
    () => {
      try {
        const serializedAuthentication = JSON.stringify(authentication);
        localStorage.setItem('auth', serializedAuthentication);
      } catch (err) {
        // Ignore write errors.
      }
    },
    5000, {trailing: true})
}

export default function authentication(state = {isAuthenticated: false, token: {}, user: {}}, action) {
  switch (action.type) {
    case AuthenticationConstants.SIGN_IN_SUCCESS:
      return merge({}, state, {isAuthenticated: true})
    case AuthenticationConstants.UPDATE_TOKEN:
      let authentication = merge({}, state, {isAuthenticated: true, token: action.payload.token});
      setTimeout(saveAuthentication(authentication), 200)
      return authentication
    case AuthenticationConstants.SIGN_IN_FAILURE:
      return merge({}, state, {isAuthenticated: false})
    default:
      return state;
  }
}
