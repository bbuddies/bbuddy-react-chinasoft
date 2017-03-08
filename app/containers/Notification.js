import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Snackbar} from 'material-ui'
import * as CommonActions from '../actions/common'

@connect(mapStateToProps, mapDispatchToProps)
export default class Notification extends React.Component {
  render() {
    const { notification, closeNotification } = this.props;
    return (
      <Snackbar
        ref="snackbar"
        open={notification.open}
        message={notification.message}
        autoHideDuration={notification.duration}
        onRequestClose={closeNotification} />
    )
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CommonActions, dispatch)
}
