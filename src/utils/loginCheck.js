/**
 * @abstract 验证是否登录
 * @author taoyawei
 */
const { ErrorModal } = require('./response.js')
const { loginCheckFailInfo } = require('./errorInfo.js')
const { get } = require('../redis/index.js')
async function loginCheck (ctx, next) {
  const user = await get('userInfo')
  // console.log(user)
  if (user) {
    // 已登录，往下走
    await next()
    return
  }
  //未登录
  ctx.body = new ErrorModal(loginCheckFailInfo)
}

// /**
//  * 判断参数是否
//  */
// async function judgeParams () {
//   if (arguments.length === 0) {
//     return true
//   } else {
//     let isTrue = true
//     for (let key in arguments) {
//       if (!arguments[key]) {
//         isTrue = false
//       }
//     }
//   }
//   return isTrue
// }
module.exports = {
  loginCheck
}
