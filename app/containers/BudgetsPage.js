import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import find from 'lodash/find'
import moment from 'moment'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

@connect(mapStateToProps, mapDispatchToProps)
export default class BudgetsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      total:0
    }
  }
  componentWillMount(){
    this.props.loadBudgets()
  }

  caculate(){
    let startDay = this.refs.startDay.value
    let endDay = this.refs.endDay.value
    let result = this.props.caculate(this.props.budgets,startDay,endDay,(result)=>{this.setState({total:result})})

  }
  render() {
    const {goToAddBudget, budgets} = this.props
    return (
      <Card>
        <input type='text' ref='startDay' />
        <input type='text' ref='endDay' />
        <button onClick={() => this.caculate()}>Caculate</button>
        <span>result:</span>
        <span>{this.state.total}</span>
        <CardTitle title='Budgets'/>
        <CardText>
          <Table height='500px' fixedHeader={true} >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="Month">Month</TableHeaderColumn>
                <TableHeaderColumn tooltip="Amount">Amount</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} stripedRows={true}>
              {budgets.map((budget, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{budget.month}</TableRowColumn>
                  <TableRowColumn>{budget.amount}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <RaisedButton label='Add' primary={true} onTouchTap={goToAddBudget}/>
        </CardActions>
      </Card>
    )
  }
}

function mapStateToProps(state){
  return {
    budgets: values(state.entities.budgets)
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
}
