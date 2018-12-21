if (process.env.API_ENV === 'prod' || process.env.API_ENV === 'gray') {
  module.exports = require('./server.prod')
} else {
  module.exports = require('./server.test')
}
