'use strict'

module.exports = {
  NODE_ENV: '"production"',
  API_ENV: `"${process.env.API_ENV}"`, // 接口环境 test, gray, prod
  BUILDTIME_ENV: `"${parseInt(Date.now() / 1000 / (60 * 10))}"`, // zip小版本，不用卸载app，热更新
  VERSION_ENV: '"1.0.0"', // app大版本，需要app重新安装时该版本才会变动
  PID_ENV: '"00000000000"' // 当前app的厂家pid, 区分app的标识
}
