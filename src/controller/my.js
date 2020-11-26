/**
 * @abstract 我的模块controller
 * @author taoyawei
 */
const {ErrorModal, SuccessModal} = require('../utils/response.js')
const {
  requestParams
} = require('../utils/errorInfo.js')
const {get} = require('../redis/index.js')

const {
  doGetUser,
  doGetFans,
  doGetBook
} = require('../modular/my.js')

/**
 * 获取用户信息
 */
async function getUser () {
  const info = await get('userInfo')
  const result = await doGetUser(info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 8001,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取该用户的粉丝信息
 */
async function getFans () {
  const info = await get('userInfo')
  const result = await doGetFans(info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 8002,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取该用户上传图书
 */
async function getBook () {
  const info = await get('userInfo')
  const result = await doGetBook(info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 8003,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
module.exports = {
  getUser,
  getFans,
  getBook
}