import { combineReducers } from 'redux'
import {routerReducer as routing} from 'react-router-redux'
// import { routerStateReducer as router } from 'redux-router'
import pageStyle from './pageStyle'
import notification from './notification'
import entities from './entities'
import indicator from './indicator'

const rootReducer = combineReducers({
  pageStyle,
  notification,
  indicator,
  entities,
  routing
})

export default rootReducer
