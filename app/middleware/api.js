import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import qs from 'qs'
import parse from 'parse-link-header'
import 'isomorphic-fetch'
import values from 'lodash/values'
import * as CommonConstants from '../constants/common'
import config from '../config'

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
function callApi(endpoint, method, data, schema) {
  var fullUrl = (endpoint.indexOf(config.apiUrl) === -1) ? config.apiUrl + endpoint : endpoint
  const options = {
    headers: {
      'Accept': 'application/vnd.yihuode.v1',
      'Content-Type': 'application/json'
    },
    method: method,
    credentials: 'include'
  }
  if (data){
    if (method.toLowerCase() == 'get'){
      fullUrl += '?' + qs.stringify(data)
    } else {
      options['body'] = JSON.stringify(data)
    }
  }

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response)

      return schema ? Object.assign({}, normalize(camelizedJson, schema), {nextPageUrl}) : camelizedJson
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

  let { endpoint } = callAPI
  const { schema, types, method, data, success } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))
  next({type: CommonConstants.SHOW_INDICATOR})

  return callApi(endpoint, method, data, schema).then(
    response => {
      next({type: CommonConstants.HIDE_INDICATOR})
      return next(actionWith({
        response,
        type: successType
      }))
    },
    error => {
      next({type: CommonConstants.HIDE_INDICATOR})
      return next(actionWith({
        type: failureType,
        error: values(error).join(', ') || 'Something bad happened'
      }))
    }
  )
}
