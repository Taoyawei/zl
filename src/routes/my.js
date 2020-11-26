/**
 * @abstract 我的模块路由
 * @author taoyawei
 */

const router = require('koa-router')()
const {loginCheck} = require('../utils/loginCheck.js')
const {
  getUser,
  getFans,
  getBook
} = require('../controller/my.js')

// 获取用户信息,粉丝数，收藏数，上传图书数
router.get('/userInfo', loginCheck, async (ctx, next) =>{
  ctx.body = await getUser()
})

// 获取用户粉丝
router.get('/userFans', loginCheck, async (ctx, next) => {
  ctx.body = await getFans()
})

// 获取本人上传的图书
router.get('/userBook', loginCheck, async (ctx, next) => {
  ctx.body = await getBook()
})

module.exports = router