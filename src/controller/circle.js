/**
 * @abstract 圈子模块controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {
  requestParams
} = require('../utils/errorInfo.js')
const {
  doCreateCricle,
  doFindCircle,
  doGetBook,
  doAddCircle
} = require('../modular/circle.js')
 /**
  * 新建圈子
  * @param {string} circle_type 圈子类型
  * @param {date} create_time 创建事件
  * @param {int} create_id 创建人id
  * @param {string} brief  简洁
  */
async function createCricle ({circle_type, create_time, create_id, brief}) {
  if (!circle_type || !create_time || !create_id || !brief) return new ErrorModal(requestParams)
  const result = await doCreateCricle({
    circle_type,
    create_time,
    create_id,
    brief
  })
  // resultHandle(result)
  if (result && result.error) {
    return new ErrorModal({
      code: 5001,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}

/**
 * 根据用户id获取圈子
 * @param {int} create_id
 */
async function findCircle (create_id) {
  if (!create_id) return new ErrorModal(requestParams)
  const result = await doFindCircle(create_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 5002,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 根据圈子id获取图书
 * @param {int} circle_id 圈子id
 */
async function getBook (circle_id) {
  const result = await doGetBook(circle_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 5003,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 用户加入圈子
 * @param {int} user_id 用户id
 * @param {int} circle_id 圈子id
 */
async function addCircle(user_id, circle_id) {
  if (!user_id || !circle_id) return new ErrorModal(requestParams)
  const result = await doAddCircle(user_id, circle_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 5004,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
module.exports = {
  createCricle,
  findCircle,
  getBook,
  addCircle
}