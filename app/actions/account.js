import {fetchAccounts, createAccount} from './account.generated'

export function loadAccounts(){
  return (dispatch, getState) => {
    dispatch(fetchAccounts())
  }
}

export function addAccount(account, success){
  return (dispatch, getState) => {
    dispatch(createAccount(account)).then(success)
  }
}
