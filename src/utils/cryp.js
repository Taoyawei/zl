/**
 * @abstract 加密方法
 * @author taoyawei
 */

const crypto = require('crypto')
const key = 'SD123ui_sd$@'

/**
 * md5加密
 * @param {string} content 明文
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') // 十六进制加密
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto (content) {
  const str = `password=${content}&key=${key}`
  return _md5(str)
}

module.exports = doCrypto
