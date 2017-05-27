import {loadAccounts, addAccount} from '../../app/actions/account'
import * as actions from '../../app/actions/account.generated'

describe('account actions', () => {
  let dispatch, getState, account
  beforeEach(() => {
    dispatch = sinon.stub().returns(Promise.resolve({}))
    getState = sinon.stub()
    account = {}
  })
  it('load accounts', () => {
    loadAccounts()(dispatch, getState)
    dispatch.should.be.calledWith(actions.fetchAccounts())
  })
  context('add account', () => {
    let success
    beforeEach(() => {
      success = sinon.spy()
    })
    it('dispatch create account', () => {
      addAccount(account, success)(dispatch, getState)
      dispatch.should.be.calledWith(actions.createAccount(account))
    })
    it('callback when add success', () => {
      dispatch.returns(Promise.resolve({type: actions.ADD_ACCOUNT_SUCCESS}))
      addAccount(account, success)(dispatch, getState)
      success.should.be.called
    })
    it('no callback when add fail', () => {
      dispatch.returns(Promise.resolve({type: actions.ADD_ACCOUNT_FAILURE}))
      addAccount(account, success)(dispatch, getState)
      success.should.not.be.called
    })
  })
})
