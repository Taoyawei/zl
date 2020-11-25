/**
 * @abstract 排行榜路由
 * @author taoyawei
 */

const router = require('koa-router')()
const {loginCheck} = require('../utils/loginCheck.js')

const {
  getUser,
  getBook,
  getCircle
} = require('../controller/list.js')

// 获取用户排行
router.post('/userRank', loginCheck, async (ctx, next) => {
  const {pageNo, pageSize} = ctx.request.body
  ctx.body = await getUser(pageNo, pageSize)
})

// 获取书本排行
router.post('/bookRank', loginCheck, async (ctx, next) =>{
  const {pageNo, pageSize} = ctx.request.body
  ctx.body = await getBook(pageNo, pageSize)
})

// 圈子排行
router.post('/circleRank', loginCheck, async (ctx, next) => {
  const {pageNo, pageSize} = ctx.request.body
  ctx.body = await getCircle(pageNo, pageSize)
})
module.exports = router
