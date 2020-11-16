/**
 * @abstract 用户信息路由对应方法
 * @author taoyawei
 */
const {
  getUser,
  createUser,
  domodify
} = require('../modular/user.js')

// 导入公共方法
// const  {
//   judgeParams
// } = require('../utils/public.js')
// 导入成功，失败模板
const {
  SuccessModal,
  ErrorModal
} = require('../utils/response')
// 导入错误对应的信息
const  {
  registerUserNameExistInfo,
  registerFailInfo,
  requestParams,
  registerUserNameNotExistInfo,
  changePasswordFailInfo
} = require('../utils/errorInfo.js')

const doCrypto = require('../utils/cryp')

const { set, get } = require('../redis/index.js')

/**
 * 注册
 */
async function setRegister({mobile, password, nickName}) {
  if (!mobile || !password || !nickName) return new ErrorModal(requestParams)
  // 是否存在改用户
  const result = await getUser(mobile)
  // 如果存在该用户，错误
  if (result) {
    return new ErrorModal(registerUserNameExistInfo) // 用户名已存在
  }
  // 用户不存在，我们将数据存入数据库
  try {
    const data = await createUser({
      mobile,
      password: doCrypto(password),
      nickName
    })
    return new SuccessModal(data)
  } catch (ex) {
    return new ErrorModal(registerFailInfo)
  }
}

/**
 * 登录
 */
async function setLogin ({ ctx, mobile, password }) {
  // judgeParams(mobile, password)
  if (!mobile || !password) return new ErrorModal(requestParams)
  // 根据信息查询用户
  const result = await getUser(mobile, doCrypto(password))
  if (!result) return new ErrorModal(registerUserNameNotExistInfo)
  
  // 将登录信息存入redis
  const info = await get('userInfo')
  if (!info) set('userInfo', result, 24*60*60*1000)
  return new SuccessModal()
}

/**
 * 退出登录
 */
async function deleteLogin ({ctx}) {
  set('userInfo', null)
  return new SuccessModal()
}

/**
 * @param {string} mobile 手机号
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function modifyPassword ({mobile, password, newPassword}) {
  if (!mobile || !password || !newPassword || password === newPassword) return new ErrorModal(requestParams)
  const result = await domodify({mobile, password, newPassword})
  if (!result) {
    return new ErrorModal(changePasswordFailInfo)
  }
  return new SuccessModal()
  // 7fe36acc02204c5a0f61e5b77b8e0793
  // 7fe36acc02204c5a0f61e5b77b8e0793
}
module.exports = {
  setRegister,
  setLogin,
  deleteLogin,
  modifyPassword
}
