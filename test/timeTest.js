import now from '../app/now'
import moment from 'moment'

describe('now', () => {
  it('display as string', () => {
    function getFakeTime() {
      return new Date(2017, 5, 9, 13, 40, 5, 1)
    }
    now(getFakeTime).should.be.eql('2017-06-09 13:40:05.001')
  })
})
