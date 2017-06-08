import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AddBudgetPage extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        month: {
          value: '',
          isValid: false
        },
        amount: {
          value: '',
          isValid: false
        }
      }
    }
  }

  handleValueChange(field, value) {
    let {form} = this.state;
    let obj = {value, isValid: false}

    switch (field) {
      case 'month':
        if ((/^\d{4}-\d{2}$/g).test(value)) {
          obj = {
            value,
            isValid: true
          }
        }
        break
      case 'amount':
        if (value > 0) {
          obj = {
            value,
            isValid: true
          }
        }
        break
    }
    this.setState({
      form: {
        ...form,
        [field]: obj
      }
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
                     onChange={(e) => this.handleValueChange("month", e.target.value)}/>
          <TextField fullWidth={true} id="amount" ref="amount" hintText="Amount" floatingLabelText="Amount"
                     onChange={(e) => this.handleValueChange("amount", e.target.value)}/>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save' disabled={!(this.state.form.amount.isValid && this.state.form.month.isValid)}
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}

