import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'
import values from 'lodash/values'
import moment from 'moment'

const mapStateToProps = (state) => ({ budgets: values(state.entities.budgets)})
const mapDispatchToProps = (dispatch) => bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AddBudgetPage extends React.Component {
  save(){
    const month = this.refs.month.getValue()
    const amount = this.refs.amount.getValue()
    const {budgets} = this.props
    //validte month and amount
    if (!(this.validateMonth(month) &&  this.validateAmount(amount))) return; 
    for(let index in budgets){
        if(budgets[index].month === month) {
          budgets[index].amount = amount
          this.props.updateAddedBudget(budgets[index], this.props.goBack)
          return;
        }
    }
    this.props.addBudget({month, amount}, this.props.goBack);
  }

  validateMonth (month) {
    let result = month ? true: false;
    result = moment(month, 'YYYY-MM',true).isValid();
    return result;
  }

  validateAmount (amount) {
    let isValid = false;
     if (amount && amount.match(/^[1-9]\d*$/)) {
       isValid = true;
     }
    return isValid;
  }
  render() {
    const {goBack} = this.props
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="Month" floatingLabelText="Month" autoFocus />
          <TextField fullWidth={true} id="amount" ref="amount" hintText="Amount" floatingLabelText="Amount" />
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save'
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}

