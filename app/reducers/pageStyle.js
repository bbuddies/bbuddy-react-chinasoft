import getMuiTheme from 'material-ui/styles/getMuiTheme';
import merge from 'lodash/merge'
import * as CommonConstants from '../constants/common'

const initialState = { muiTheme: getMuiTheme(), mobile: false };

export default function pageStyle(state = initialState, action) {
  if (action.type == CommonConstants.RESIZE_DEVICE){
    return merge({}, state, { width: action.width, mobile: action.payload.width < 990})
  }
  return state;
}
