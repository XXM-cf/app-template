const fs = require('fs')
const ENV = require('../config/prod.env')

module.exports = () => {
  fs.writeFileSync(
    './dist/version.json',
    JSON.stringify(
      {
        version: ENV.VERSION_ENV.replace(/\"/g, ''),
        pid: ENV.PID_ENV.replace(/\"/g, ''),
        time: parseInt(ENV.BUILDTIME_ENV.replace(/\"/g, '')),
        address: '$ADDRESS',
        md5: '$MDS'
      },
      null,
      2
    )
  )
}
