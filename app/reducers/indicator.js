import merge from 'lodash/merge'
import * as CommonConstants from '../constants/common'

export default function indicator(state = {open: false}, action) {
  switch (action.type){
    case CommonConstants.SHOW_INDICATOR:
      return merge({}, state, {open: true})
    case CommonConstants.HIDE_INDICATOR:
      return merge({}, state, {open: false})
    default:
      return state;
  }
}
