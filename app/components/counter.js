import React from 'react'

export default class Counter extends React.Component {
  render() {
    const {name, count, onAddClick, onMinusClick} = this.props
    return (
      <div>
        <span>{name}: </span><span>{count}</span>
        <button onClick={onAddClick }>+</button>
        <button onClick={onMinusClick }>-</button>
      </div>
    )
  }
}
