import { goBack as back, push} from 'react-router-redux';

export function goBack(){
  return (dispatch, getState) => {
    dispatch(back())
  }
}

export function goToAddAccount(){
  return (dispatch, getState) => {
    dispatch(push('/accounts/add'))
  }
}

export function goToAddBudget(){
  return (dispatch, getState) => {
    dispatch(push('/budgets/add'))
  }
}
