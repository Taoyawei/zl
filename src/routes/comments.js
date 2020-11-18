/**
 * @abstract 评论模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {loginCheck} = require('../utils/loginCheck.js')
const {
  addComment
} = require('../controller/comments.js')

// 添加评论
router.post('/add', loginCheck, async (ctx, next) => {
  const {content, create_time, user_id, book_id} = ctx.request.body
  ctx.body = await addComment({
    content,
    create_time,
    user_id,
    book_id
  })
})

module.exports = router