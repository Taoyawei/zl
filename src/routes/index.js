/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()
const users = require('./users.js')
const book = require('./book.js')
const comment = require('./comments.js')
const circle = require('./circle.js')
const list = require('./list.js')
const my = require('./my.js')

router.use('/api/user', users.routes(), users.allowedMethods())
router.use('/api/book', book.routes(), book.allowedMethods())
router.use('/api/comment', comment.routes(), comment.allowedMethods())
router.use('/api/circle', circle.routes(), circle.allowedMethods())
router.use('/api/list', list.routes(), list.allowedMethods())
router.use('/api/my', my.routes(), my.allowedMethods())

module.exports = router
