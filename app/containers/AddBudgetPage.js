import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'
import _ from 'lodash'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)

const isEmpty = value => !value.length
const isNotEmpty = _.negate(isEmpty)

const validations = {
  month: [
    {validate: isNotEmpty, message: 'Month cannot be empty'},
    {validate: value => (/^\d{4}-\d{2}$/g).test(value), message: 'Invalid month format'}
  ],
  amount: [
    {validate: isNotEmpty, message: 'Amount cannot be empty'},
    {validate: value => value > 0, message: 'Invalid amount'}
  ]
}

const emptyValidation = field =>
  [_.conforms({[field]: isEmpty}), _.constant(`${_.startCase(field)} cannot be empty`)]


const validate = _.cond([
  emptyValidation('month'),
  [_.conforms({month: value => !(/^\d{4}-\d{2}$/g).test(value)}), _.constant('Invalid month format')],
  emptyValidation('amount'),
  [_.conforms({amount: value => value <= 0}), _.constant('Invalid amount')],
  [_.stubTrue, _.constant('')]
])

@connect(mapStateToProps, mapDispatchToProps)
export default class AddBudgetPage extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        month: {
          value: '',
          isValid: false,
          message: ''
        },
        amount: {
          value: '',
          isValid: false
        }
      },
    }
  }

  handleValueChange(field, value) {
    let {form} = this.state;

    form[field].value = value


    form[field].message = _(validations[field]).chain()
      .find(validation => !validation.validate(value))
      .defaults({message: ''})
      .value()
      .message


    form[field].isValid = !form[field].message.length

    this.setState({form})
  }

  save() {
    const month = this.refs.month.getValue()
    const amount = this.refs.amount.getValue()
    const message = validate({month, amount})
    if (message.length){
      this.setState({message})
      return
    }
    this.props.addBudget({month, amount}, this.props.goBack)
  }

  render() {
    const {goBack} = this.props
    const {message} = this.state
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        {message && (<div>{message}</div>)}
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="e.g. yyyy-mm" floatingLabelText="Month" autoFocus
                     onChange={(e) => this.handleValueChange("month", e.target.value)}
                     errorText={this.state.form.month.message}
          />
          <TextField fullWidth={true} id="amount" ref="amount" hintText="Amount" floatingLabelText="Amount"
                     onChange={(e) => this.handleValueChange("amount", e.target.value)}/>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save' //disabled={!(this.state.form.amount.isValid && this.state.form.month.isValid)}
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}

