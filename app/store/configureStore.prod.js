import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

const middleware = routerMiddleware(history)

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, api),
    applyMiddleware(middleware),
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
