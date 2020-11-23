/**
 * @abstract 圈子路由
 * @author taoyawei
 */

const router = require('koa-router')()
const {loginCheck} = require('../utils/loginCheck')
const {
  createCricle,
  findCircle,
  getBook,
  addCircle
} = require('../controller/circle.js')

// 创建圈子
router.post('/establish', loginCheck, async (ctx, next) => {
  const {circle_type, create_time, create_id, brief} = ctx.request.body
  ctx.body = await createCricle({
    circle_type,
    create_time,
    create_id,
    brief
  })
} )

// 根据用户id获取圈子
router.post('/user/circle', loginCheck, async (ctx, next) =>{
  const {create_id} = ctx.request.body
  ctx.body = await findCircle(create_id)
})

// 根据圈子id获取图书
router.post('/getBook', loginCheck, async (ctx, next) => {
  const {circle_id} = ctx.request.body
  ctx.body = await getBook(circle_id)
})

// 用户加入圈子,这个要使用到中间表，多对多关系
router.post('/add/user', loginCheck, async (ctx, next) => {
  const {user_id, circle_id} = ctx.request.body
  ctx.body = await addCircle(user_id, circle_id)
})

// 根据圈子获取圈子里面的用户
// 根据用户id获取圈子
module.exports = router
