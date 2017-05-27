import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Promise from './common/promise'

chai.should();
chai.use(sinonChai);

global.sinon = sinon
global.window = {}
global.Promise = Promise

