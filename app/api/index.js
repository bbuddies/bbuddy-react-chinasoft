import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import qs from 'qs'
import 'isomorphic-fetch'
import config from '../config'
import {storeToken, fetchToken} from './token'

export default function callApi(endpoint, method, data, schema) {
  var fullUrl = (endpoint.indexOf(config.apiUrl) === -1) ? config.apiUrl + endpoint : endpoint
  let token = fetchToken()
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
    .then(response => response.json().then(json =>  ({json, response}) ))
    .then(({json, response}) => {
      let token = {
        accessToken: response.headers.get('access-token'),
        client: response.headers.get('client'),
        expiry: response.headers.get('expiry'),
        type: response.headers.get('token-type'),
        uid: response.headers.get('uid'),
      }
      storeToken(token)

      if (!response.ok) {
        return Promise.reject({status: response.status, data: json})
      }

      const camelizedJson = camelizeKeys(json)

      return schema ? normalize(camelizedJson, schema) : camelizedJson
    })
}
