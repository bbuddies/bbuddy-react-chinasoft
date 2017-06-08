import values from 'lodash/values'
import * as CommonActions from '../actions/common'
import {push} from 'react-router-redux';
import callApi from '../api'

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const {endpoint, schema, types, method, data} = callAPI

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({type: requestType}))
  next(CommonActions.showIndicator())

  return callApi(endpoint, method, data, schema).then(
    data => {
      next(CommonActions.hideIndicator())
      return next(actionWith({ data, type: successType }))
    },

    ({status, data}) => {
      if (status == 401) {
        next(push('/signin'))
      }
      next(CommonActions.hideIndicator())
      return next(actionWith({
        type: failureType,
        error: values(data).join(', ') || 'Something bad happened'
      }))
    }
  )
}
