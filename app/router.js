import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import Page from './containers/Page'
import DashboardPage from './containers/DashboardPage'
import SignInPage from './containers/SignInPage'
import requireAuth from './authentication'

export default ({store}) => {
  const history = syncHistoryWithStore(process.env.NODE_ENV == "production" ? browserHistory : hashHistory, store)
  return (
    <Router history={history}>
      <Route path="/signin" component={SignInPage}/>
      <Route path="/" component={Page} onEnter={requireAuth}>
        <IndexRedirect to="dashboard"/>
        <Route path="dashboard" component={DashboardPage}/>
      </Route>
    </Router>
  )
}
