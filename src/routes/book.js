/**
 * @abstract 书本处理路由
 * @author taoyawei
 */

const router = require('koa-router')()
const { loginCheck } = require('../utils/loginCheck.js')
const {
  updataBook,
  setBook,
  getCollection,
  getDateBook,
  getBookInfo,
  collectionBook,
  addCircle
} = require('../controller/book.js')

// 上传图书
router.post('/updata', loginCheck, async(ctx, next) => {
  const file = ctx.request.files.file
  ctx.body = await updataBook(file)
})

// 提交图书信息
router.post('/info', loginCheck, async (ctx, next) => {
  const { book_name, author } = ctx.request.body
  ctx.body = await setBook({
    book_name,
    author
  })
})

// 根据用户id获取收藏的书籍
router.get('/collection/book', loginCheck, async (ctx, next) => {
  ctx.body = await getCollection()
})

// 根据上传日期获取图书列表
router.post('/date/book', async (ctx, next) => {
  const { startDate, endDate } = ctx.request.body
  ctx.body = await getDateBook({
    startDate,
    endDate
  })
})

// 根据书籍id获取书籍信息
router.post('/bookInfo', loginCheck, async (ctx, next) => {
  const { book_id } = ctx.request.body
  ctx.body = await getBookInfo({book_id})
})

// 收藏图书路由
router.post('/collection', loginCheck, async (ctx, next) => {
  const {book_name, author, user_id, updata_id} = ctx.request.body
  ctx.body = await collectionBook({
    book_name,
    author,
    user_id,
    updata_id
  })
})

// 图书加入圈子
router.post('/add/circle', loginCheck, async (ctx, next) => {
  const {circle_id, id} = ctx.request.body
  ctx.body = await addCircle(circle_id, id)
})
module.exports = router
