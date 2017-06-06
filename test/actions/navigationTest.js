import { goBack as back, push} from 'react-router-redux';
import {goBack, goToAddAccount} from '../../app/actions/navigation'

describe('Navigation', () => {
  let dispatch
  beforeEach(() => {
    dispatch = sinon.stub()
  })
  it('go back', () => {
    goBack()(dispatch)
    dispatch.should.be.calledWith(back())
  })
  it('go to add acccount', () => {
    goToAddAccount()(dispatch)
    dispatch.should.be.calledWith(push('/accounts/add'))
  })
})
