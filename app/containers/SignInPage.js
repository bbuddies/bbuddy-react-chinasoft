import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as AuthenticationActions from '../actions/authentication'
import {Card, CardTitle, CardText, TextField, CardActions, RaisedButton} from 'material-ui'

@connect(mapStateToProps, mapDispatchToProps)
export default class SignInPage extends React.Component {

  signIn() {
    let email = this.refs.email.getValue()
    let password = this.refs.password.getValue()
    this.props.signIn({email, password})
  }

  keyPress(event){
    if (event.charCode == 13){
      event.preventDefault()
      this.signIn()
    }
  }

  render() {
    const {pageStyle: {muiTheme}} = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardTitle title='Sign In'/>
          <CardText>
            <TextField fullWidth={true} id='Username' ref='email' hintText='Email' floatingLabelText='Email' autoFocus={true} />
            <TextField fullWidth={true} id='Password' ref='password' type="password" hintText='Password' floatingLabelText='Password' onKeyPress={event => this.keyPress(event)} />
          </CardText>
          <CardActions>
            <RaisedButton
              label='Login'
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
