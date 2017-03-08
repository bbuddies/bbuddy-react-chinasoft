import merge from 'lodash/merge'
import * as CommonConstants from '../constants/common'

export default function notification(state = {open: false, message: "", duration: 3000}, action) {
  switch (action.type){
    case CommonConstants.OPEN_NOTIFICATION:
      return merge({}, state, {open: true, message: action.payload.message})
    case CommonConstants.CLOSE_NOTIFICATION:
      return merge({}, state, {open: false})
    default:
      return state;
  }
}
