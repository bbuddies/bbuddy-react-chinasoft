import config from '../../app/config'
import callApi from '../../app/api'
import * as token from '../../app/api/token'
import { schema } from 'normalizr'

describe('api', () => {
  let fetch, response, fetchToken, storeToken
  beforeEach(() => {
    response = {json: () => Promise.resolve({}), ok: true, headers: {get: () => {}}}
    fetch = sinon.stub().returns(Promise.resolve(response))
    fetchToken = sinon.stub(token, 'fetchToken')
    storeToken = sinon.stub(token, 'storeToken')
    fetchToken.returns({})
    global.fetch = fetch
  })
  afterEach(() => {
    fetchToken.restore()
    storeToken.restore()
  })
  context('request', () => {
    it('use url', () => {
      config.apiUrl = 'http://localhost/'
      callApi('http://localhost/ENDPOINT', 'METHOD', {}, null)
      fetch.should.be.calledWith('http://localhost/ENDPOINT', sinon.match.any)
    })
    it('complete full url', () => {
      config.apiUrl = 'http://localhost/'
      callApi('ENDPOINT', 'METHOD', {}, null)
      fetch.should.be.calledWith('http://localhost/ENDPOINT', sinon.match.any)
    })
    it('with expected method', () => {
      config.apiUrl = 'http://localhost/'
      callApi('ENDPOINT', 'METHOD', {}, null)
      fetch.should.be.calledWith(sinon.match.any, sinon.match.has('method', 'METHOD').and(sinon.match.has('credentials', 'include')))
    })
    it('with token', () => {
      fetchToken.returns({
        client: 'CLIENT',
        accessToken: 'ACCESS_TOKEN',
        uid: 'UID',
        expiry: 'EXPIRY',
        type: 'TYPE'
      })
      callApi('ENDPOINT', 'METHOD', {}, null)
      fetch.should.be.calledWith(sinon.match.any, sinon.match.has('headers', {
        'client': 'CLIENT',
        'access-token': 'ACCESS_TOKEN',
        'uid': 'UID',
        'expiry': 'EXPIRY',
        'token-type': 'TYPE',
        'Content-Type': 'application/json'
      }))
    })
    it('query data', () => {
      config.apiUrl = 'http://localhost/'
      callApi('ENDPOINT', 'GET', {a: 1}, null)
      fetch.should.be.calledWith('http://localhost/ENDPOINT?a=1', sinon.match.any)
    })
    it('post data', () => {
      callApi('ENDPOINT', 'POST', {a: 1}, null)
      fetch.should.be.calledWith(sinon.match.any, sinon.match.has('body', '{"a":1}'))
    })
  })
  context('response', () => {
    it('store token', () => {
      let getHeader = sinon.stub(response.headers, 'get')
      getHeader.withArgs('access-token').returns('RESPONSE_ACCESS_TOKEN')
      getHeader.withArgs('client').returns('RESPONSE_CLIENT')
      getHeader.withArgs('expiry').returns('RESPONSE_EXPIRY')
      getHeader.withArgs('token-type').returns('RESPONSE_TYPE')
      getHeader.withArgs('uid').returns('RESPONSE_UID')

      callApi('ENDPOINT', 'POST')

      storeToken.should.be.calledWith({
        accessToken: 'RESPONSE_ACCESS_TOKEN',
        client: 'RESPONSE_CLIENT',
        expiry: 'RESPONSE_EXPIRY',
        type: 'RESPONSE_TYPE',
        uid: 'RESPONSE_UID'
      })
    })
    it('bad response', () => {
      response.json = () => Promise.resolve({a:1})
      response.ok = false
      response.status = 400

      let success = sinon.spy()
      callApi('ENDPOINT', 'POST').then(success, (result) => {
        result.should.be.eql({
          status: 400,
          data: {a:1}
        })
      })
      success.should.not.be.called

    })
    it('camelized json data', () => {
      response.json = () => Promise.resolve({a_id:1})
      callApi('ENDPOINT', 'POST').then(result => {
        result.should.be.eql({ aId: 1 })
      })
    })
    it('normalized json data', () => {
      response.json = () => Promise.resolve({id:2, name: 'Name'})
      let account = new schema.Entity('accounts')
      callApi('ENDPOINT', 'POST', {}, account).then(result => {
        result.should.be.eql({
          entities: {
            accounts: {
              2: {id: 2, name: 'Name'}
            }
          },
          result: 2})
      })
    })
  })
})
