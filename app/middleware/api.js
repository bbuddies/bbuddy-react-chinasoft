import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import qs from 'qs'
import parse from 'parse-link-header'
import 'isomorphic-fetch'
import values from 'lodash/values'
import config from '../config'
import * as CommonActions from '../actions/common'
import * as AuthenticationActions from '../actions/authentication'
import {push} from 'react-router-redux';

function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const parsed = parse(link)
  return parsed.next && parsed.next.url
}


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, method, data, schema, token) {
  var fullUrl = (endpoint.indexOf(config.apiUrl) === -1) ? config.apiUrl + endpoint : endpoint
  const options = {
    headers: {
      'client': token.client,
      'access-token': token.accessToken,
      'uid': token.uid,
      'expiry': token.expiry,
      'token-type': token.type,
      'Content-Type': 'application/json'
    },
    method: method,
    credentials: 'include'
  }
  if (data) {
    if (method.toLowerCase() == 'get') {
      fullUrl += '?' + qs.stringify(data)
    } else {
      options['body'] = JSON.stringify(data)
    }
  }

  return fetch(fullUrl, options)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      let token = {
        accessToken: response.headers.get('access-token'),
        client: response.headers.get('client'),
        expiry: response.headers.get('expiry'),
        type: response.headers.get('token-type'),
        uid: response.headers.get('uid'),
      }

      if (!response.ok) {
        return Promise.reject({status: response.status, data: json, token})
      }

      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response)

      let data = schema ? Object.assign({}, normalize(camelizedJson, schema), {nextPageUrl}) : camelizedJson;
      return {data, token}
    })
}

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

  return callApi(endpoint, method, data, schema, store.getState().authentication.token).then(
    ({data, token}) => {
      if (token.accessToken != null && token.client != null && token.expiry != null && token.type != null && token.uid != null) {
        next(AuthenticationActions.updateToken(token))
      }
      next(CommonActions.hideIndicator())
      return next(actionWith({ data, type: successType }))
    },
    ({status, data, token}) => {
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
