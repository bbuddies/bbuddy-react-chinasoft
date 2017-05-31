import * as MuiTheme from 'material-ui/styles/getMuiTheme'
import pageStyle from '../../app/reducers/pageStyle'

describe('Page style reducer', () => {
  it('set device size when device resize', () => {
    pageStyle({muiTheme: {}, mobile: false}, {type: 'RESIZE_DEVICE', payload: {width: 1000}})
      .should.be.eql({muiTheme: {}, width: 1000, mobile: false})
  })
  it('set to mobile mode when width less than 900', () => {
    pageStyle({muiTheme: {}, width: 1000, mobile: false}, {type: 'RESIZE_DEVICE', payload: {width: 800}})
      .should.be.eql({muiTheme: {}, width: 800, mobile: true})
  })
  context('MuiTheme', () => {
    let getMuiTheme
    beforeEach(() => {
      getMuiTheme = sinon.stub(MuiTheme, 'default').returns({})
    })
    afterEach(() => {
      getMuiTheme.restore()
    })
    it('with default state', () => {
      pageStyle(undefined, {type: 'SOME_ACTION'})
        .should.be.eql({muiTheme: {}, mobile: false})
    })
  })
})
