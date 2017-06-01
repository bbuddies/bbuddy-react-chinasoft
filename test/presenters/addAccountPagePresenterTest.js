import {AddAccountPagePresenter} from '../../app/presenters/addAccountPagePresenter'

describe('AddAccountPagePresenter', () => {
  context('Save account', () => {
    let addAccountStub, goBackSpy
    beforeEach(() => {
      let props = {addAccount: () => {}, goBack: () => {}}
      addAccountStub = sinon.stub(props, 'addAccount').yields()
      goBackSpy = sinon.spy(props, 'goBack')
      let presenter = new AddAccountPagePresenter(props)
      presenter.getProps().addAccount({name: 'CMB', balance: '1000'})
    })
    it('save by action', () => {
      addAccountStub.should.be.calledWith({name: 'CMB', balance: '1000'}, sinon.match.any)
    })
    it('go back after saving', () => {
      goBackSpy.should.be.called
    })
  })
  context('map props', () => {
    it('from state with nothing', () => {
      AddAccountPagePresenter.mapStateToProps().should.be.eql({})
    })
    it('with account & navigation actions', () => {
      AddAccountPagePresenter.mapDispatchToProps().should.include.keys('addAccount', 'goBack')
    })
  })
})
