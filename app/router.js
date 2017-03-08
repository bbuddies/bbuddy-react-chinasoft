import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import { syncHistoryWithStore} from 'react-router-redux'
import Page from './containers/Page'

export default ({store}) => {
  const history = syncHistoryWithStore(browserHistory, store)
  return (
    <Router history={history}>
      <Route path="/" component={Page}>
      </Route>
    </Router>
  )
}
