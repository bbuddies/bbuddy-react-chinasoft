import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import DevTools from './DevTools'
import Router from '../router'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const {store} = this.props
    return (
      <Provider store={store}>
        <div>
          <Router store={store} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

