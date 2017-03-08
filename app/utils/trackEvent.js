if (process.env.NODE_ENV === 'production') {
  module.exports = require('./trackEvent.prod')
} else {
  module.exports = require('./trackEvent.dev')
}
