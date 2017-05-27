import {fetchAccounts, createAccount, ADD_ACCOUNT_SUCCESS} from './account.generated'

export function loadAccounts(){
  return (dispatch, getState) => {
    dispatch(fetchAccounts())
  }
}

export function addAccount(account, success){
  return (dispatch, getState) => {
    dispatch(createAccount(account)).then(action => {
      if (action.type == ADD_ACCOUNT_SUCCESS){
        success()
      }
    })
  }
}
