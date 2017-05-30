import {default as api, CALL_API} from '../../app/middleware/api'
import * as Api from '../../app/api'
import {push} from 'react-router-redux'

describe('Api middleware', () => {
  let store, next, action, callApi
  beforeEach(() => {
    store = {}
    next = sinon.spy()
    action = {
      [CALL_API]: {
        types: ['REQUEST', 'SUCCESS', 'FAILURE'],
        endpoint: 'ENDPOINT',
        schema: {},
        method: 'METHOD',
        data: {}
      }
    }
    callApi = sinon.stub(Api, 'default')
    callApi.returns(Promise.resolve({}))
  })
  afterEach(() => {
    callApi.restore()
  })
  it('let next middleware to handle action if it is not a CALL_API action', () => {
    action = {type: 'ANY_TYPE'}
    api(store)(next)(action)

    next.should.be.calledWith(action)
  })
  it('dispatch request type action', () => {
    api(store)(next)(action)

    next.should.be.calledWith({type: 'REQUEST'})
  })
  it('dispatch show indicator type action', () => {
    api(store)(next)(action)

    next.should.be.calledWith({type: 'SHOW_INDICATOR'})
  })
  it('dispatch success type action when api invocation success', () => {
    callApi.returns(Promise.resolve({id: 1}))
    api(store)(next)(action)

    next.should.be.calledWith({type: 'SUCCESS', data: {id: 1}})
  })
  it('dispatch hide indicator type action when api invocation success', () => {
    callApi.returns(Promise.resolve({id: 1}))
    api(store)(next)(action)

    next.should.be.calledWith({type: 'HIDE_INDICATOR'})
  })
  it('dispatch failure type action when api invocation fail', () => {
    callApi.returns(Promise.reject({status: 500, data: {name: 'Wrong name', balance: 'Wrong number'}}))
    api(store)(next)(action)

    next.should.be.calledWith({type: 'FAILURE', error: 'Wrong name, Wrong number'})
  })
  it('dispatch failure type action with default error message when api invocation fail without specific error', () => {
    callApi.returns(Promise.reject({status: 500, data: {}}))
    api(store)(next)(action)

    next.should.be.calledWith({type: 'FAILURE', error: 'Something bad happened'})
  })
  it('dispatch hide indicator type action when api invocation fail', () => {
    callApi.returns(Promise.reject({status: 500, data: {}}))
    api(store)(next)(action)

    next.should.be.calledWith({type: 'HIDE_INDICATOR'})
  })
  it('dispatch redirect to sign in when unauthorized', () => {
    callApi.returns(Promise.reject({status: 401, data: {}}))
    api(store)(next)(action)

    next.should.be.calledWith(push('/signin'))
  })
})
