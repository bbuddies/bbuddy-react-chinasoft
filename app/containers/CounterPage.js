import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as CounterActions from '../actions/counter'

@connect(mapStateToProps, mapDispatchToProps)
export default class CounterPage extends React.Component {
  render() {
    const {counter: {name, count}, increase, decrease} = this.props
    return (
      <div>
        <span>{name}: </span><span>{count}</span>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(CounterActions, dispatch)
}





