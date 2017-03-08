import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'


export default function configureStore(routes, initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, api),
  )(createStore)

  return finalCreateStore(rootReducer, initialState)
}
