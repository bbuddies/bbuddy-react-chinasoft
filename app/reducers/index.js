import { combineReducers } from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import pageStyle from './pageStyle'
import notification from './notification'
import entities from './entities'
import indicator from './indicator'
import authentication from './authentication'

const rootReducer = combineReducers({
  authentication,
  pageStyle,
  notification,
  indicator,
  entities,
  routing
})

export default rootReducer
