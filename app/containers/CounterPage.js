import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as CounterActions from '../actions/counter'

@connect(mapStateToProps, mapDispatchToProps)
export default class CounterPage extends React.Component {
  render() {
    const {counter: {name, count}, increase, decrease} = this.props
    return (
      <div>
        <span>{name}: </span><span>{count}</span>
        <button onClick={() => increase(this.refs.offset.value - 0)}>+</button>
        <button onClick={decrease}>-</button>
        <input type="text" ref="offset" />
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





