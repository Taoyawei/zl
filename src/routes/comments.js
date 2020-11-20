/**
 * @abstract 评论模块路由
 * @author taoyawei
 */
const router = require('koa-router')()
const {loginCheck} = require('../utils/loginCheck.js')
const {
  addComment,
  addReply,
  getComment,
  getReply,
  dotGive,
  deleteLike
} = require('../controller/comments.js')

// 添加评论,不是回复
router.post('/add', loginCheck, async (ctx, next) => {
  const {content, create_time, user_id, user_name, book_id} = ctx.request.body
  ctx.body = await addComment({
    content,
    create_time,
    user_id,
    user_name,
    book_id
  })
})

// 添加回复
router.post('/add/reply', loginCheck, async (ctx, next) => {
  const {content, user_id, user_name, comment_id} = ctx.request.body
  // console.log(content, user_id, user_name, comment_id)
  ctx.body = await addReply({
    content,
    user_id,
    user_name,
    comment_id
  })
})

// 根据书本id获取评论，分页
router.post('/getComment', loginCheck, async (ctx, next) => {
  const { book_id, pageSize, pageNo } = ctx.request.body
  ctx.body = await getComment({book_id, pageSize, pageNo})
})

// 根据评论的id获取回复，分页
router.post('/getreply', loginCheck, async (ctx, next) => {
  const { comment_id, pageSize, pageNo } = ctx.request.body
  ctx.body = await getReply({
    comment_id,
    pageSize,
    pageNo
  })
})

// 点赞
router.post('/give', loginCheck, async (ctx, next) => {
  const { comment_id } = ctx.request.body
  ctx.body = await dotGive(comment_id)
})

// 取消点赞
router.post('/delete/like', loginCheck, async (ctx, next) => {
  const { comment_id } = ctx.request.body
  ctx.body = await deleteLike(comment_id)
})
module.exports = router