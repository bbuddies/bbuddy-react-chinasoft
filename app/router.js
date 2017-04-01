import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import { syncHistoryWithStore} from 'react-router-redux'
import Page from './containers/Page'
import DashboardPage from './containers/DashboardPage'

export default ({store}) => {
  const history = syncHistoryWithStore(browserHistory, store)
  return (
    <Router history={history}>
      <Route path="/" component={Page}>
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={DashboardPage} />
      </Route>
    </Router>
  )
}
