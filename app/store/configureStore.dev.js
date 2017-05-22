import { createStore, applyMiddleware, compose } from 'redux'
import DevTools from '../containers/DevTools'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

const middleware = routerMiddleware(history)

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    applyMiddleware(middleware),
    applyMiddleware(createLogger()),
    DevTools.instrument()
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
