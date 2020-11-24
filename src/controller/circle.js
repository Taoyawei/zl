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
  doAddCircle,
  doGetUser,
  doGetCircle,
  doDeleteCircle
} = require('../modular/circle.js')
const { get } = require('../redis/index.js')
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

/**
 * 根据圈子id获取加入圈子的用户
 * @param {int} circle_id 圈子id
 */
async function getUser (circle_id) {
  if (!circle_id) return new ErrorModal(requestParams)
  const result = await doGetUser(circle_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 5005,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 根据用户id获取圈子
 * @param {int} user_id 用户id
 */
async function getCircle (user_id) {
  if (!user_id) return new ErrorModal(requestParams)
  const result = await doGetCircle(user_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 5006,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 删除圈子
 * @param {int} create_id 创建id
 * @param {int} circle_id 圈子id
 */
async function deleteCircle ({create_id, circle_id}) {
  if (!create_id || !circle_id) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  if (create_id !== info.id) return new ErrorModal({
    code: 5007,
    message: '该圈子不是您的，您无修改权限'
  })
  const result = await doDeleteCircle({create_id, circle_id})
  if (result && result.error) {
    return new ErrorModal({
      code: 5008,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}
module.exports = {
  createCricle,
  findCircle,
  getBook,
  addCircle,
  getUser,
  getCircle,
  deleteCircle
}