import notification from '../../app/reducers/notification'

describe('Notification reducer', () => {
  it('open notification', () => {
    notification({open: false, message: '', duration: 3000},
      {type: 'OPEN_NOTIFICATION', payload: {message: 'MESSAGE'}})
      .should.be.eql({open: true, message: 'MESSAGE', duration: 3000})
  })
  it('close notification', () => {
    notification({open: true, message: 'MESSAGE', duration: 3000},
      {type: 'CLOSE_NOTIFICATION'})
      .should.be.eql({open: false, message: 'MESSAGE', duration: 3000})
  })
  it('with default state', () => {
    notification(undefined, {type: 'SOME_ACTION'})
      .should.be.eql({open: false, message: '', duration: 3000})
  })
})
