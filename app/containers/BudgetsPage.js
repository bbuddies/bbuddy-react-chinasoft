import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  RaisedButton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TextField,
  DatePicker
} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

@connect(mapStateToProps, mapDispatchToProps)
export default class BudgetsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: ''
    }
  }

  componentWillMount() {
    this.props.loadBudgets()
  }

  check() {
    const {budgets} = this.props
    const date1 = this.refs.date1.getDate()
    const date2 = this.refs.date2.getDate()

    if (date1 && date2) {
      if (date2 < date1) {
        this.setState({
          msg: '"End Date" should be later than "Start Date".'
        })
      } else {
        let msg = 'The total amount is: '
        this.props.calc({budgets, date1, date2, msg}, (text) => {
          this.setState({
            msg: text
          })
        })
      }
    } else {
      this.setState({
        msg: 'Please select "Start Date" and "End Date".'
      })
    }
  }


  render() {
    const {goToAddBudget, budgets} = this.props
    return (
      <Card>
        <CardTitle title='Budgets'/>
        <DatePicker
          autoOk={true} ref="date1"
          floatingLabelText="Start Date"
        />
        <DatePicker
          autoOk={true} ref="date2"
          floatingLabelText="End Date"
        />
        <RaisedButton label='Check' primary={true} onTouchTap={() => this.check()}/>
        <TextField id="msg" fullWidth={true} value={this.state.msg} disabled={true}/>
        <CardText>
          <Table height='500px' fixedHeader={true}>
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

function mapStateToProps(state) {
  return {
    budgets: values(state.entities.budgets)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
}


















