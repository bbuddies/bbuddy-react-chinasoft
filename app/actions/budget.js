import {fetchBudgets, createBudget, updateBudget, ADD_BUDGET_SUCCESS, UPDATE_BUDGET_SUCCESS} from './budget.generated'

export function loadBudgets() {
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}

export const addBudget = (budget, success) => {
  return (dispatch, getState) => {
    dispatch(createBudget(budget)).then(action => {
      if (action.type == ADD_BUDGET_SUCCESS){
        success()
      }
    })
  }
}

export const updateAddedBudget = (budget, success) => {
  return (dispatch, getState) => {
    dispatch(updateBudget(budget)).then(action => {
      if (action.type == UPDATE_BUDGET_SUCCESS){
        success()
      }
    })
  }
}
