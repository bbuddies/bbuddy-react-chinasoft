import authentication from '../../app/reducers/authentication'

describe('Authentication reducer', () => {
  it('sign in success', () => {
    authentication({isAuthenticated: false}, {type: 'SIGN_IN_SUCCESS'}).should.be.eql({isAuthenticated: true})
  })
  it('sign in failure', () => {
    authentication({isAuthenticated: false}, {type: 'SIGN_IN_FAILURE'}).should.be.eql({isAuthenticated: false})
  })
  it('sign in failure when already signed in', () => {
    authentication({isAuthenticated: true}, {type: 'SIGN_IN_FAILURE'}).should.be.eql({isAuthenticated: false})
  })
  it('with default state', () => {
    authentication(undefined, {type: 'SOME_ACTION'}).should.be.eql({isAuthenticated: false})
  })
})
