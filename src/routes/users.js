/**
 * @abstract 用户信息相关路由
 * @author taoyawei
 */
const router = require('koa-router')()
const  { loginCheck } = require('../utils/loginCheck')
const {
  setRegister,
  setLogin,
  deleteLogin,
  modifyPassword,
  goFollow,
  removeFollow
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
  // console.log('***************')
  // console.log(ctx.request.body)
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

// 修改密码
router.post('/modify/password', loginCheck, async (ctx, next) => {
  const  { mobile, password, newPassword } = ctx.request.body
  ctx.body = await modifyPassword({
    mobile,
    password,
    newPassword
  })
})

// 关注用户，就是成为这个用户的粉丝
router.post('/follow', loginCheck, async (ctx, next) => {
  const {user_id, fans_id} = ctx.request.body
  ctx.body = await goFollow(user_id, fans_id)
})

// 取消关注
router.post('/remove/follow', loginCheck, async (ctx, next) => {
  const {user_id} = ctx.request.body
  ctx.body = await removeFollow(user_id)
})
module.exports = router
