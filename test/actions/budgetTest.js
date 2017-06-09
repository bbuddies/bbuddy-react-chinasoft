import {caculate} from '../../app/actions/budget'

describe('Total amount', () => {

  it('no budget', () => {
    caculate([], '2017-04-01', '2017-04-01', total =>{
      total.should.be.eql(0)
    })
  })

  it('not in a budget month', () => {
    caculate([{month: '2017-05', amount: 310}], '2017-04-01', '2017-04-01', total =>{
      total.should.be.eql(0)
    })
  })

  it('start and end all in a budget month', () => {
    caculate([{month: '2017-05', amount: 310}], '2017-05-01', '2017-05-10', total =>{
      total.should.be.eql(100)
    })
  })

  it('only budget month in start and end', () => {
    caculate([{month: '2017-05', amount: 310}], '2017-02-01', '2017-06-10', total =>{
      total.should.be.eql(310)
    })
  })

  it('start early than budget month and end in month', () => {
    caculate([{month: '2017-05', amount: 310}], '2017-04-15', '2017-05-15', total =>{
      total.should.be.eql(150)
    })
  })

  it('start in month and end later than month', () => {
    caculate([{month: '2017-05', amount: 310}], '2017-05-20', '2017-08-15', total =>{
      total.should.be.eql(120)
    })
  })

  it('more budget months', () => {
    caculate([{month: '2017-05', amount: 310}, {month: '2017-06', amount: 3000}, {month: '2017-07', amount: 31}],
      '2017-05-20', '2017-08-15', total =>{
      total.should.be.eql(120 + 3000 + 31)
    })
  })

  it('missing some middle budget months', () => {
    caculate([{month: '2017-05', amount: 310}, {month: '2017-07', amount: 3100}, {month: '2017-09', amount: 30}],
      '2017-05-20', '2017-09-15', total =>{
        total.should.be.eql(120 + 3100 + 15)
      })
  })

})
