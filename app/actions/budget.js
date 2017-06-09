import {fetchBudgets, createBudget, ADD_BUDGET_SUCCESS} from './budget.generated'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM'

export function loadBudgets() {
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}

export const addBudget = (budget, success) => {
  return (dispatch, getState) => {
    dispatch(createBudget(budget)).then(action => {
      if (action.type == ADD_BUDGET_SUCCESS) {
        success()
      }
    })
  }
}

export const calc = (data, callback) => {
  const {budgets, date1, date2, msg} = data
  return (dispatch, getState) => {
    dispatch(() => {
      let budget = {}, months = [], tempDate = moment(date1).set('date', 1), total = 0
      for (let v of budgets) {
        if (moment(v.month, DATE_FORMAT, true).isValid()) {
          budget[v.month] = v.amount
        }
      }
      console.info(budget)

      while (tempDate <= date2) {
        months.push(moment(tempDate).format(DATE_FORMAT))
        tempDate = moment(tempDate).add(1, 'months')
      }
      console.info(months)

      if (months.length === 1) {
        total = (budget[moment(date1).format(DATE_FORMAT)] || 0) / moment(date1).daysInMonth()
          * (moment(date2).date() - moment(date1).date() + 1)
      } else {
        months.forEach((v, i) => {
          const currentMonthBudget = budget[v] || 0
          if (i === 0) {
            total += currentMonthBudget / moment(date1).daysInMonth()
              * (moment(date1).daysInMonth() - moment(date1).date() + 1)
          } else if (i === months.length - 1) {
            total += currentMonthBudget / moment(date2).daysInMonth()
              * moment(date2).date()
          } else {
            total += currentMonthBudget
          }
        })
      }
      callback(msg + total)
    })
  }
}