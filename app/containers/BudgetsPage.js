import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

@connect(mapStateToProps, mapDispatchToProps)
export default class BudgetsPage extends React.Component {
  componentWillMount(){
    this.props.loadBudgets()
  }
  render() {
    const {goToAddBudget, budgets} = this.props
    return (
      <Card>
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


















