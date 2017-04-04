import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EventListener from 'react-event-listener'
import Notification from '../containers/Notification'
import Indicator from '../containers/Indicator'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Body from '../components/body'
import Footer from '../components/footer'
import * as CommonActions from '../actions/common'
import * as AuthenticationActions from '../actions/authentication'
import {Card, CardTitle, CardText, TextField, CardActions, RaisedButton} from 'material-ui'

@connect(mapStateToProps, mapDispatchToProps)
export default class SignInPage extends React.Component {

  signIn() {
    let email = this.refs.email.getValue()
    let password = this.refs.password.getValue()
    this.props.signIn({email, password})
  }

  render() {
    const {pageStyle: {muiTheme}} = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardTitle title='Sign In'/>
          <CardText>
            <TextField fullWidth={true} ref='email' hintText='Email'/>
            <TextField fullWidth={true} ref='password' type="password" hintText='Password'/>
          </CardText>
          <CardActions>
            <RaisedButton
              label='Sign In'
              primary={true}
              onTouchTap={() => this.signIn()}/>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    pageStyle: state.pageStyle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthenticationActions, dispatch)
}
