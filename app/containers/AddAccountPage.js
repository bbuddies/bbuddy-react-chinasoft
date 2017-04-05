import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Card, CardTitle, CardText, CardActions, RaisedButton} from 'material-ui'
import * as AccountActions from '../actions/account'


@connect(mapStateToProps, mapDispatchToProps)
export default class AddAccountsPage extends React.Component {
  save(){

  }
  render() {
    return (
      <Card>
        <CardTitle title='Add Account'/>
        <CardText>

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
  return bindActionCreators(AccountActions, dispatch)
}
