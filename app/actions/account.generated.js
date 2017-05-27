import { CALL_API } from '../middleware/api'


import { schema } from 'normalizr'

export const Account = new schema.Entity('accounts')
export const AccountList = [Account]

export const LOAD_ACCOUNTS_REQUEST = 'LOAD_ACCOUNTS_REQUEST'
export const LOAD_ACCOUNTS_SUCCESS = 'LOAD_ACCOUNTS_SUCCESS'
export const LOAD_ACCOUNTS_FAILURE = 'LOAD_ACCOUNTS_FAILURE'

export function fetchAccounts(){
  return {
    [CALL_API]: {
      types: [LOAD_ACCOUNTS_REQUEST, LOAD_ACCOUNTS_SUCCESS, LOAD_ACCOUNTS_FAILURE],
      endpoint: `accounts`,
      method: 'GET',
      schema: AccountList
    }
  }
}

export const ADD_ACCOUNT_REQUEST = 'ADD_ACCOUNT_REQUEST'
export const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS'
export const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE'

export function createAccount(account){
  return {
    [CALL_API]: {
      types: [ADD_ACCOUNT_REQUEST, ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_FAILURE],
      endpoint: `accounts`,
      method: 'POST',
      data: account,
      schema: Account
    }
  }
}

export const GET_ACCOUNT_REQUEST = 'GET_ACCOUNT_REQUEST'
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS'
export const GET_ACCOUNT_FAILURE = 'GET_ACCOUNT_FAILURE'

export function getAccount(id){
  return {
      [CALL_API]: {
          types: [GET_ACCOUNT_REQUEST, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAILURE],
          endpoint: `accounts/${id}`,
          method: 'GET',
          schema: Account
      }
  }
}

export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST'
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS'
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE'

export function updateAccount(account){
  return {
      [CALL_API]: {
          types: [UPDATE_ACCOUNT_REQUEST, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILURE],
          endpoint: `accounts/${account.id}`,
          method: 'PUT',
          schema: Account
      }
  }
}

export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST'
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS'
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE'

export function deleteAccount(account){
  return {
      [CALL_API]: {
          types: [DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILURE],
          endpoint: `accounts/${account.id}`,
          method: 'DELETE',
          schema: Account
      }
  }
}
