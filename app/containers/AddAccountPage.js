import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import merge from 'lodash/merge'
import {routerActions} from 'react-router-redux'
import * as AccountActions from '../actions/account'


@connect(mapStateToProps, mapDispatchToProps)
export default class AddAccountsPage extends React.Component {
  save(){
    let name = this.refs.name.getValue()
    let balance = this.refs.balance.getValue()
    this.props.addAccount({name, balance}, () => {this.props.goBack()})
  }
  render() {
    return (
      <Card>
        <CardTitle title='Add Account'/>
        <CardText>
          <TextField fullWidth={true} ref="name" hintText="Name" floatingLabelText="Name" autoFocus />
          <TextField fullWidth={true} ref="balance" hintText="Balance" floatingLabelText="Balance" />
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

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(merge({}, AccountActions, routerActions), dispatch)
}
