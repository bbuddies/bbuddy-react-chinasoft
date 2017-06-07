import merge from 'lodash/merge'

export default (state={name: "Counter", count: 0}, action) => {
  switch (action.type){
    case 'INCREASE':
      return merge({}, state, {count: state.count + 1})
    case 'DECREASE':
      return merge({}, state, {count: state.count - 1})
    default:
      return state
  }
}
