import { CALL_API } from '../middleware/api'
import * as AuthenticationConstants from '../constants/authentication'
import {push} from 'react-router-redux'

export function doSignIn(credential){
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

