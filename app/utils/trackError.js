if (process.env.NODE_ENV === 'production') {
  module.exports = require('./trackError.prod')
} else {
  module.exports = require('./trackError.dev')
}
