import React from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux'


const mapStateToProps = (state) => ({
  token: state.authentication.token,
  user: state.authentication.user,
  isAuthenticated: state.authentication.isAuthenticated
});

@connect(mapStateToProps)
export default class Authentication extends React.Component {

  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth();
  }

  checkAuth() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(replace({
          pathname: "/signin",
          state: {nextPathname: this.props.location.pathname}
        })
      )
    }
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated === true
          ? this.props.children
          : null
        }
      </div>
    )

  }
}


