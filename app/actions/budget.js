import {fetchBudgets, createBudget, ADD_BUDGET_SUCCESS} from "./budget.generated";
import moment from "moment";
import _ from "lodash";

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

export const calculateOffset = (startMonth, endMonth, budgets) => {
  return (dispatch, getSate) => {
    //1.计算出月份
    let offSet = moment(endMonth).diff(moment(startMonth), "month")
    console.log("month:" + offSet)
    console.log(moment(startMonth).format("YYYY-MM"))
    console.log(moment(endMonth).format("YYYY-MM"))
    //2.根据开始结束月份获取到对应的数据
    let amount = _.result(_.find(budgets, budget => budget.month === moment(startMonth).format("YYYY-MM")), 'amount')
    let amount1 = _.result(_.find(budgets, budget => budget.month === moment(endMonth).format("YYYY-MM")), 'amount')
    let budgetsCount = _.result(_.find(budgets, budget => {return budget}))
    //3.当月份小于1的时候，只有当月的数据，结果为当月预算的平均值*查询天数
    //4.当月份等于1的时候 a.只有两个月，那么结果为两个月分别预算的平均值*各自的天数
    //b.当月份大于1的时候，结果为中间整月预算加上两头月份平均预算*各自天数
    console.log("count:" + amount)
    console.log("count:" + amount1)
    console.log(JSON.stringify(budgetsCount))
    if (offSet == 0) {
    }
  }

}
