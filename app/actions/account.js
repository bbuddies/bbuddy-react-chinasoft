import { CALL_API } from '../middleware/api'
import * as AccountConstants from '../constants/account'
import {Account, AccountList} from '../schemas'

function fetchAccounts(){
  return {
    [CALL_API]: {
      types: [AccountConstants.LOAD_ACCOUNTS_REQUEST, AccountConstants.LOAD_ACCOUNTS_SUCCESS, AccountConstants.LOAD_ACCOUNTS_FAILURE],
      endpoint: `accounts`,
      method: 'GET',
      schema: AccountList
    }
  }
}

export function loadAccounts(){
  return (dispatch, getState) => {
    dispatch(fetchAccounts())
  }
}

function createAccount(account){
  return {
    [CALL_API]: {
      types: [AccountConstants.ADD_ACCOUNT_REQUEST, AccountConstants.ADD_ACCOUNT_SUCCESS, AccountConstants.ADD_ACCOUNT_FAILURE],
      endpoint: `accounts`,
      method: 'POST',
      data: account,
      schema: Account
    }
  }
}

export function addAccount(account, success){
  return (dispatch, getState) => {
    dispatch(createAccount(account)).then(success)
  }
}
