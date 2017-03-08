import * as CommonConstants from '../constants/common'

export function openNotification(message) {
  return {type: CommonConstants.OPEN_NOTIFICATION, payload: {message} }
}

export function closeNotification() {
  return {type: CommonConstants.CLOSE_NOTIFICATION}
}

export function resizeDevice(width) {
  return {type: CommonConstants.RESIZE_DEVICE, payload: {width} }
}
