/**
 * @abstract 用户信息相关路由
 * @author taoyawei
 */
const router = require('koa-router')()
const  { loginCheck } = require('../utils/loginCheck')
const {
  setRegister,
  setLogin,
  deleteLogin
} = require('../controller/user.js')

// 注册
router.post('/register', async (ctx, next) => {
  const { password, nickName, mobile } = ctx.request.body
  ctx.body = await setRegister({
    mobile,
    password,
    nickName
  })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { mobile, password } = ctx.request.body
  ctx.body = await setLogin({
    ctx,
    mobile,
    password
  })
})
// 退出登录
router.get('/deleteLogin', loginCheck, async (ctx, next) => {
  ctx.body = await deleteLogin({
    ctx
  })
})

module.exports = router
