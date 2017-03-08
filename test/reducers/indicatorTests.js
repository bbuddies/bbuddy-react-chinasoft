import indicator from '../../app/reducers/indicator';
var should = require('chai').should();

describe('indicator reducers', function() {
  it('shows progress indicator when request starts', function(){
    var state = indicator({open: false}, {type: 'SHOW_INDICATOR'});
    state.should.eql({open: true})
  })
  it('hide progress indicator when request ends', function(){
    var state = indicator({open: true}, {type: 'HIDE_INDICATOR'});
    state.should.eql({open: false})
  })
})