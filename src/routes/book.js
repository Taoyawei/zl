/**
 * @abstract 书本处理路由
 * @author taoyawei
 */

const router = require('koa-router')()
const { loginCheck } = require('../utils/loginCheck.js')
const {
  updataBook
} = require('../controller/book.js')

// 上传图书
router.post('/updata', loginCheck, async(ctx, next) => {
  const file = ctx.request.files.file
  ctx.body = await updataBook(file)
})

module.exports = router
