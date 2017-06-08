import { CALL_API } from '../middleware/api'


import { schema } from 'normalizr'

export const Budget = new schema.Entity('budgets')
export const BudgetList = [Budget]

export const LOAD_BUDGETS_REQUEST = 'LOAD_BUDGETS_REQUEST'
export const LOAD_BUDGETS_SUCCESS = 'LOAD_BUDGETS_SUCCESS'
export const LOAD_BUDGETS_FAILURE = 'LOAD_BUDGETS_FAILURE'

export function fetchBudgets(){
  return {
    [CALL_API]: {
      types: [LOAD_BUDGETS_REQUEST, LOAD_BUDGETS_SUCCESS, LOAD_BUDGETS_FAILURE],
      endpoint: `budgets`,
      method: 'GET',
      schema: BudgetList
    }
  }
}

export const ADD_BUDGET_REQUEST = 'ADD_BUDGET_REQUEST'
export const ADD_BUDGET_SUCCESS = 'ADD_BUDGET_SUCCESS'
export const ADD_BUDGET_FAILURE = 'ADD_BUDGET_FAILURE'

export function createBudget(budget){
  return {
    [CALL_API]: {
      types: [ADD_BUDGET_REQUEST, ADD_BUDGET_SUCCESS, ADD_BUDGET_FAILURE],
      endpoint: `budgets`,
      method: 'POST',
      data: budget,
      schema: Budget
    }
  }
}

export const GET_BUDGET_REQUEST = 'GET_BUDGET_REQUEST'
export const GET_BUDGET_SUCCESS = 'GET_BUDGET_SUCCESS'
export const GET_BUDGET_FAILURE = 'GET_BUDGET_FAILURE'

export function getBudget(id){
  return {
      [CALL_API]: {
          types: [GET_BUDGET_REQUEST, GET_BUDGET_SUCCESS, GET_BUDGET_FAILURE],
          endpoint: `budgets/${id}`,
          method: 'GET',
          schema: Budget
      }
  }
}

export const UPDATE_BUDGET_REQUEST = 'UPDATE_BUDGET_REQUEST'
export const UPDATE_BUDGET_SUCCESS = 'UPDATE_BUDGET_SUCCESS'
export const UPDATE_BUDGET_FAILURE = 'UPDATE_BUDGET_FAILURE'

export function updateBudget(budget){
  return {
      [CALL_API]: {
          types: [UPDATE_BUDGET_REQUEST, UPDATE_BUDGET_SUCCESS, UPDATE_BUDGET_FAILURE],
          endpoint: `budgets/${budget.id}`,
          method: 'PUT',
          data: budget,
          schema: Budget
      }
  }
}

export const DELETE_BUDGET_REQUEST = 'DELETE_BUDGET_REQUEST'
export const DELETE_BUDGET_SUCCESS = 'DELETE_BUDGET_SUCCESS'
export const DELETE_BUDGET_FAILURE = 'DELETE_BUDGET_FAILURE'

export function deleteBudget(budget){
  return {
      [CALL_API]: {
          types: [DELETE_BUDGET_REQUEST, DELETE_BUDGET_SUCCESS, DELETE_BUDGET_FAILURE],
          endpoint: `budgets/${budget.id}`,
          method: 'DELETE',
          schema: Budget
      }
  }
}
