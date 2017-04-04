import merge from 'lodash/merge'
import * as AuthenticationConstants from '../constants/authentication'

export default function authentication(state = {isAuthenticated: false, token: {}, user: {}}, action) {
  switch (action.type) {
    case AuthenticationConstants.SIGN_IN_SUCCESS:
      return merge({}, state, {isAuthenticated: true})
    case AuthenticationConstants.UPDATE_TOKEN:
      return merge({}, state, {token: action.payload.token})
    case AuthenticationConstants.SIGN_IN_FAILURE:
      return merge({}, state, {isAuthenticated: false})
    default:
      return state;
  }
}
