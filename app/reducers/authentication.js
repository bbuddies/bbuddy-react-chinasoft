import merge from 'lodash/merge'
import * as AuthenticationConstants from '../constants/authentication'

export default function authentication(state = {isAuthenticated: false}, action) {
  switch (action.type) {
    case AuthenticationConstants.SIGN_IN_SUCCESS:
      return merge({}, state, {isAuthenticated: true})
    case AuthenticationConstants.SIGN_IN_FAILURE:
      return merge({}, state, {isAuthenticated: false})
    default:
      return state;
  }
}
