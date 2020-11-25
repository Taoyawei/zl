/**
 * @abstract 排行模块的controller
 * @author taoyawei
 */
const {
  doGetUser,
  doGetBook,
  doGetCircle
} = require('../modular/list.js')
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {requestParams} = require('../utils/errorInfo.js')
const {get} = require('../redis/index.js')

/**
 * 获取用户
 * @param {*} pageNo 页数
 * @param {*} pageSize 每页条数
 */
async function getUser (pageNo, pageSize) {
  if (!pageNo || !pageSize) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  const result = await doGetUser(pageNo, pageSize, info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 6001,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取书本排行，根据收藏数
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function getBook (pageNo, pageSize) {
  if (!pageNo || !pageSize) return new ErrorModal(requestParams)
  const result = await doGetBook(pageNo, pageSize)
  if (result && result.error) {
    return new ErrorModal({
      code: 6002,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取圈子排行(根据加入人数)
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function getCircle (pageNo, pageSize) {
  if (!pageNo || !pageSize) return new ErrorModal(requestParams)
  const result = await doGetCircle(pageNo, pageSize)
  if (result && result.error) {
    return new ErrorModal({
      code: 6003,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
module.exports = {
  getUser,
  getBook,
  getCircle
}