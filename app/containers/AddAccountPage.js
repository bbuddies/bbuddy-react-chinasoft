import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import present from '../presenters/addAccountPagePresenter'


@present
export default class AddAccountPage extends React.Component {
  save(){
    let name = this.refs.name.getValue()
    let balance = this.refs.balance.getValue()
    this.props.addAccount({name, balance})
  }
  render() {
    return (
      <Card>
        <CardTitle title='Add Account'/>
        <CardText>
          <TextField fullWidth={true} id="name" ref="name" hintText="Name" floatingLabelText="Name" autoFocus />
          <TextField fullWidth={true} id="balanceBroughtForward" ref="balance" hintText="Balance" floatingLabelText="Balance" />
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
