import {fetchBudgets, createBudget, ADD_BUDGET_SUCCESS,UPDATE_BUDGET_SUCCESS, updateBudget} from './budget.generated'
import values from 'lodash/values'
import find from 'lodash/find'
import moment from 'moment'

export function loadBudgets() {
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}

export const caculate = (budgets,startDay,endDay,success) => {
  var result = 0;
  if(moment(startDay).isSame(endDay, 'month')){
     let targetMonth = find(budgets, budget => moment(startDay, 'YYYY-MM-DD').isSame(moment(budget.month, 'YYYY-MM'), 'month'))
     let daysInMonth = moment(startDay, "YYYY-MM").daysInMonth()
     result = targetMonth.amount*(moment(endDay).date()-moment(startDay).date()+1)/daysInMonth
  }else{
    budgets.forEach((budget, index) =>{
       let daysInMonth = moment(budget.month, "YYYY-MM").daysInMonth()
       if(moment(budget.month).isSame(startDay, 'month') ){
         let daysLeft = daysInMonth - moment(startDay).date()+1
         result += budget.amount*(daysLeft/daysInMonth)
       }else if(moment(budget.month).isSame(endDay, 'month')){
         let daysLeft = moment(endDay).date()
         result += budget.amount*(daysLeft/daysInMonth)
       }else if(moment(budget.month).isBetween(startDay,endDay)){
         result += budget.amount
       }
    })
  }
  success(result);
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
