import entities from '../../app/reducers/entities'

describe('Entities reducer', () => {
  it('apply any action with entities', () => {
    entities({accounts: {}}, {data: {entities: {accounts: {2: {id: 2}}, budgets: {1: {id: 1}}}}})
      .should.be.eql({accounts: {2: {id: 2}}, budgets: {1: {id: 1}}})
  })
  it('with default ', () => {
    entities(undefined, {type: 'SOME_ACTION'})
      .should.be.eql({accounts: {}})
  })
})
