import { CALL_API } from '../middleware/api'


import { schema } from 'normalizr'

export const <%= Entity %> = new schema.Entity('<%= entities %>')
export const <%= Entity %>List = [<%= Entity %>]

export const LOAD_<%= ENTITIES %>_REQUEST = 'LOAD_<%= ENTITIES %>_REQUEST'
export const LOAD_<%= ENTITIES %>_SUCCESS = 'LOAD_<%= ENTITIES %>_SUCCESS'
export const LOAD_<%= ENTITIES %>_FAILURE = 'LOAD_<%= ENTITIES %>_FAILURE'

export function fetch<%= Entities %>(){
  return {
    [CALL_API]: {
      types: [LOAD_<%= ENTITIES %>_REQUEST, LOAD_<%= ENTITIES %>_SUCCESS, LOAD_<%= ENTITIES %>_FAILURE],
      endpoint: `<%= entities %>`,
      method: 'GET',
      schema: <%= Entity %>List
    }
  }
}

export const ADD_<%= ENTITY %>_REQUEST = 'ADD_<%= ENTITY %>_REQUEST'
export const ADD_<%= ENTITY %>_SUCCESS = 'ADD_<%= ENTITY %>_SUCCESS'
export const ADD_<%= ENTITY %>_FAILURE = 'ADD_<%= ENTITY %>_FAILURE'

export function create<%= Entity %>(<%= entity %>){
  return {
    [CALL_API]: {
      types: [ADD_<%= ENTITY %>_REQUEST, ADD_<%= ENTITY %>_SUCCESS, ADD_<%= ENTITY %>_FAILURE],
      endpoint: `<%= entities %>`,
      method: 'POST',
      data: <%= entity %>,
      schema: <%= Entity %>
    }
  }
}

export const GET_<%= ENTITY %>_REQUEST = 'GET_<%= ENTITY %>_REQUEST'
export const GET_<%= ENTITY %>_SUCCESS = 'GET_<%= ENTITY %>_SUCCESS'
export const GET_<%= ENTITY %>_FAILURE = 'GET_<%= ENTITY %>_FAILURE'

export function get<%= Entity %>(id){
  return {
      [CALL_API]: {
          types: [GET_<%= ENTITY %>_REQUEST, GET_<%= ENTITY %>_SUCCESS, GET_<%= ENTITY %>_FAILURE],
          endpoint: `<%= entities %>/${id}`,
          method: 'GET',
          schema: <%= Entity %>
      }
  }
}

export const UPDATE_<%= ENTITY %>_REQUEST = 'UPDATE_<%= ENTITY %>_REQUEST'
export const UPDATE_<%= ENTITY %>_SUCCESS = 'UPDATE_<%= ENTITY %>_SUCCESS'
export const UPDATE_<%= ENTITY %>_FAILURE = 'UPDATE_<%= ENTITY %>_FAILURE'

export function update<%= Entity %>(<%= entity %>){
  return {
      [CALL_API]: {
          types: [UPDATE_<%= ENTITY %>_REQUEST, UPDATE_<%= ENTITY %>_SUCCESS, UPDATE_<%= ENTITY %>_FAILURE],
          endpoint: `<%= entities %>/${<%= entity %>.id}`,
          method: 'PUT',
          schema: <%= Entity %>
      }
  }
}

export const DELETE_<%= ENTITY %>_REQUEST = 'DELETE_<%= ENTITY %>_REQUEST'
export const DELETE_<%= ENTITY %>_SUCCESS = 'DELETE_<%= ENTITY %>_SUCCESS'
export const DELETE_<%= ENTITY %>_FAILURE = 'DELETE_<%= ENTITY %>_FAILURE'

export function delete<%= Entity %>(<%= entity %>){
  return {
      [CALL_API]: {
          types: [DELETE_<%= ENTITY %>_REQUEST, DELETE_<%= ENTITY %>_SUCCESS, DELETE_<%= ENTITY %>_FAILURE],
          endpoint: `<%= entities %>/${<%= entity %>.id}`,
          method: 'DELETE',
          schema: <%= Entity %>
      }
  }
}
