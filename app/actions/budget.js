import {fetchBudgets, createBudget, ADD_BUDGET_SUCCESS,UPDATE_BUDGET_SUCCESS, updateBudget} from './budget.generated'
import values from 'lodash/values'

export function loadBudgets() {
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}

export const addBudget = (budget, success) => {
  return (dispatch, getState) => {

    var _budgets = getState().entities.budgets;
    var _exist = false;
    if (typeof _budgets != "undefined") {
      for (var obj in _budgets) {
        if (budget.month == _budgets[obj].month) {
          budget.id = _budgets[obj].id
          _exist = true;
        }
      };
    }
    

    if (_exist) {
      dispatch(updateBudget(budget)).then(action => {
        if (action.type == UPDATE_BUDGET_SUCCESS){
          success()
        }
      })

    } else {
      dispatch(createBudget(budget)).then(action => {
        if (action.type == ADD_BUDGET_SUCCESS){
          success()
        }
      })
    }
    
  }
}
