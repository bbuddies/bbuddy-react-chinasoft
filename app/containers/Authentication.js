import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'


const mapStateToProps = (state) => ({
  token: state.auth.token,
  userName: state.auth.userName,
  isAuthenticated: state.auth.isAuthenticated
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
      let redirectAfterLogin = this.props.location.pathname;
      this.props.dispatch(push(`/?next=${redirectAfterLogin}`));
    }
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated === true
          ? <Component {...this.props}/>
          : null
        }
      </div>
    )

  }
}


