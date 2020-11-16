/**
 * @abstract 配置redis，并且封装存入，取出方法
 * @author taoyawei
 */
const { REDIS_CONFIG } = require('../config/db.js')
const redis = require('redis')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.log('redis error:', err)
})

/**
 * 存储
 * @param {string} key 键
 * @param {string} value 值
 * @param {number} timeout 时间
 */
function set (key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}

/**
 * 取值
 * @param {string} key 键
 */
function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      // resolve(val)
      if (!val) {
        resolve(val)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
}
module.exports = {
  set,
  get
}
