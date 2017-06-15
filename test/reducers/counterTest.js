import counter from '../../app/reducers/counter'

describe('Counter reducer', () => {
  it('with default value', () => {
    counter(undefined, {type: 'SOME_ACTION'})
      .should.be.eql({name: 'Counter', count: 0})
  })
  it('increase by offset', () => {
    let initialState = {name: 'Counter', count: 10};
    let action = {type: 'INCREASE', payload: {offset: 3}};

    let result = counter(initialState, action)

    result.should.be.eql({name: 'Counter', count: 13})
  })
  it('decrease', () => {
    counter({name: 'Counter', count: 10},
      {type: 'DECREASE'})
      .should.be.eql({name: 'Counter', count: 9})
  })
})
