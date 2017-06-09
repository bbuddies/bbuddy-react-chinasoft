import {fetchBudgets, createBudget, ADD_BUDGET_SUCCESS, UPDATE_BUDGET_SUCCESS, updateBudget} from './budget.generated'
import _ from 'lodash'
import moment from 'moment'

export function loadBudgets() {
  return (dispatch, getState) => {
    dispatch(fetchBudgets())
  }
}

const monthOfBudget = budget => moment(budget.month, 'YYYY-MM')

const dailyAmountOfBudget = budget => budget.amount / dayCountOfBudget(budget)

const dayCountOfBudget = budget => monthOfBudget(budget).daysInMonth()

const overlappingDayCountOf = (anotherPeriod, period) => {
  const startOfOverlapping = period.start.isAfter(anotherPeriod.start) ? period.start : anotherPeriod.start;
  const endOfOverlapping = period.end.isBefore(anotherPeriod.end) ? period.end : anotherPeriod.end;
  return startOfOverlapping.isAfter(endOfOverlapping) ? 0 : endOfOverlapping.date() - startOfOverlapping.date() + 1
}

const periodOfBudget = budget => ({
  start: monthOfBudget(budget).startOf('month'),
  end: monthOfBudget(budget).endOf('month')
})

const amountOfOverlapping = (budget, period) => dailyAmountOfBudget(budget) * overlappingDayCountOf(periodOfBudget(budget), period)

const parseDay = dayStr => moment(dayStr, 'YYYY-MM-DD')

export const caculate = (budgets, startDay, endDay, success) => {
  success(_(budgets)
    .sumBy(budget => amountOfOverlapping(budget,
      {start: parseDay(startDay), end: parseDay(endDay)})))
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
      }
      ;
    }


    if (_exist) {
      dispatch(updateBudget(budget)).then(action => {
        if (action.type == UPDATE_BUDGET_SUCCESS) {
          success()
        }
      })

    } else {
      dispatch(createBudget(budget)).then(action => {
        if (action.type == ADD_BUDGET_SUCCESS) {
          success()
        }
      })
    }

  }
}
