/**
 * @abstract 判断此时环境
 * @author taoyawei
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  isNotDev: ENV !== 'dev',
  isPro: ENV === 'production',
  isNotPro: ENV !== 'production',
  isTest: ENV === 'test',
  isNotTest: ENV !== 'test'
}
