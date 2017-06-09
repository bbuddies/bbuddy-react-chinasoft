import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'
import moment from 'moment'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)
const DATE_FORMAT = 'YYYY-MM'

@connect(mapStateToProps, mapDispatchToProps)
export default class AddBudgetPage extends React.Component {
  constructor() {
    const isValid = false
    super();
    this.state = {
      form: {
        month: {isValid}, amount: {isValid}, anything: {isValid}, month2: {}, amount2: {}, anything2: {}
      },
      isFormValid: isValid
    }
  }

  handleValueChange(target, type) {
    const {form} = this.state
    const {id, value, required} = target
    let obj = {value, isValid: true, msg: ''}, isFormValid = true

    if (required && !value) {
      obj = {
        value,
        isValid: false,
        msg: 'This field is required.'
      }
    } else if (value) {
      switch (type) {
        case 'month':
          if (!moment(value, DATE_FORMAT, true).isValid()) {
            obj = {
              value,
              isValid: false,
              msg: 'Invalid data. The format should be "YYYY-MM".'
            }
          }
          break
        case 'amount':
          if (!(value > 0)) {
            obj = {
              value,
              isValid: false,
              msg: 'Invalid data. The value should be positive number.'
            }
          }
          break
      }
    }

    if (!obj.isValid) {
      isFormValid = false
    } else {
      for (let v in form) {
        if (v !== id && form[v].isValid === false) {
          isFormValid = false
          break
        }
      }
    }

    this.setState({
      form: {
        ...form,
        [id]: obj
      },
      isFormValid
    })
  }

  save() {
    const month = this.refs.month.getValue()
    const amount = this.refs.amount.getValue()
    this.props.addBudget({month, amount}, this.props.goBack)
  }

  render() {
    const {goBack} = this.props
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="e.g. yyyy-mm" floatingLabelText="Month" autoFocus
                     onChange={(e) => this.handleValueChange(e.target, "month")}
                     errorText={this.state.form.month.msg} required/>
          <TextField fullWidth={true} id="amount" ref="amount" hintText="Amount" floatingLabelText="Amount"
                     onChange={(e) => this.handleValueChange(e.target, "amount")}
                     errorText={this.state.form.amount.msg} required/>
          <TextField fullWidth={true} id="anything" floatingLabelText="Anything"
                     onChange={(e) => this.handleValueChange(e.target)}
                     errorText={this.state.form.anything.msg} required/><br/><br/>
          <TextField fullWidth={true} value="(Optional)" disabled={true}/>
          <TextField fullWidth={true} id="month2" floatingLabelText="Month2"
                     onChange={(e) => this.handleValueChange(e.target, "month")}
                     errorText={this.state.form.month2.msg}/>
          <TextField fullWidth={true} id="amount2" floatingLabelText="Amount2"
                     onChange={(e) => this.handleValueChange(e.target, "amount")}
                     errorText={this.state.form.amount2.msg}/>
          <TextField fullWidth={true} id="anything2" floatingLabelText="Anything2"
                     onChange={(e) => this.handleValueChange(e.target)}
                     errorText={this.state.form.anything2.msg}/>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save'
            disabled={!(this.state.isFormValid)}
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}

