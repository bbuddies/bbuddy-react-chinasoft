import { CALL_API } from '../middleware/api'
import * as AccountConstants from '../constants/account'
import {AccountList} from '../schemas'

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
