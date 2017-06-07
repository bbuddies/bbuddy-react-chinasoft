import React from 'react'
import Counter from '../components/counter'

export default class CounterPage extends React.Component {
  state = {fruit: {name:"Counter", count: 0}}
  add(offset) {
    this.state.fruit.count += offset
    this.setState(this.state)
  }
  increase() {
    this.add(1)
  }
  decrease(){
    this.add(-1)
  }
  render() {
    return (
        <Counter name={this.state.fruit.name} count={this.state.fruit.count}
                 onAddClick={() => this.increase()}
                 onMinusClick={() => this.decrease()}
        />
    )
  }
}
