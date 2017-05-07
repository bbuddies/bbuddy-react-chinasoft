import { CALL_API } from '../middleware/api'
import * as AuthenticationConstants from '../constants/authentication'
import {push} from 'react-router-redux'

function doSignIn(credential){
  return {
    [CALL_API]: {
      types: [AuthenticationConstants.SIGN_IN_REQUEST, AuthenticationConstants.SIGN_IN_SUCCESS, AuthenticationConstants.SIGN_IN_FAILURE],
      endpoint: `auth/sign_in`,
      method: 'POST',
      data: credential
    }
  }
}

export function signIn(credential){
  return (dispatch, getState) => {
    dispatch(doSignIn(credential))
      .then(action => {
        if (action.type == AuthenticationConstants.SIGN_IN_SUCCESS){
          dispatch(push('/'))
        }
      })
  }
}

export function updateToken(token){
  if (token.accessToken == null ||
      token.client == null ||
      token.expiry == null ||
      token.type == null ||
      token.uid == null)
    return {type: AuthenticationConstants.NOT_UPDATE_TOKEN}

  return {type: AuthenticationConstants.UPDATE_TOKEN, payload: {token}}
}
