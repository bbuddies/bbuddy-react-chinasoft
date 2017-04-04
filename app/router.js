import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Page from './containers/Page'
import DashboardPage from './containers/DashboardPage'
import SignInPage from './containers/SignInPage'
import requireAuth from './authentication'
import Authentication from './containers/Authentication'
import history from './history'

export default ({store}) => {
  const enhancedHistory = syncHistoryWithStore(history, store)
  return (
    <Router history={enhancedHistory}>
      <Route path="/signin" component={SignInPage}/>
      <Route path="/" component={Page}>
        <Route component={Authentication}>
          <IndexRedirect to="dashboard"/>
          <Route path="dashboard" component={DashboardPage}/>
        </Route>
      </Route>
    </Router>
  )
}
