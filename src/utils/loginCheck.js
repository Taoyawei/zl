/**
 * @abstract 验证是否登录
 * @author taoyawei
 */
const { ErrorModal } = require('./response.js')
const { loginCheckFailInfo } = require('./errorInfo.js')
const { get } = require('../redis/index.js')
async function loginCheck (ctx, next) {
  const user = await get('userInfo')
  console.log(user)
  if (user) {
    // 已登录，往下走
    await next()
    return
  }
  //未登录
  ctx.body = new ErrorModal(loginCheckFailInfo)
}
module.exports = {
  loginCheck
}
