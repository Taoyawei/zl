/**
 * @abstract mysql与redis配置
 * @author taoyawei
 */
const { isPro } = require('../utils/env.js')
// 开发环境配置
const MYSQL_CONFIG = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'taoyawei',
  database: 'koa-zl'
}
const REDIS_CONFIG = {
  host: '127.0.0.1',
  port: 6379
}

// 线上环境配置
if (isPro) {
  MYSQL_CONFIG = {}
  REDIS_CONFIG = {}
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}
