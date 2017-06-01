import indicator from '../../app/reducers/indicator';
var should = require('chai').should();

describe('Indicator reducers', function() {
  it('shows progress indicator when request starts', () => {
    var state = indicator({open: false}, {type: 'SHOW_INDICATOR'});
    state.should.eql({open: true})
  })
  it('hide progress indicator when request ends', () => {
    var state = indicator({open: true}, {type: 'HIDE_INDICATOR'});
    state.should.eql({open: false})
  })
  it('with default state', () => {
    var state = indicator(undefined, {type: 'SOME_ACTION'});
    state.should.eql({open: false})
  })
})
