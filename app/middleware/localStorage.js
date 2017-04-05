import * as AuthenticationConstants from '../constants/authentication'
import throttle from 'lodash/throttle'

let saveAuthentication = (authentication) => {
  return throttle(
    () => {
      try {
        const serializedAuthentication = JSON.stringify(authentication);
        localStorage.setItem('auth', serializedAuthentication);
      } catch (err) {
        // Ignore write errors.
      }
    },
    5000, {trailing: true})
}

export default store => next => action => {
  if(action.type == AuthenticationConstants.UPDATE_TOKEN){
    setTimeout(saveAuthentication(store.getState().authentication), 200)
  }
  return next(action)
}
