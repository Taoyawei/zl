/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()
const users = require('./users.js')
const book = require('./book.js')
const comment = require('./comments.js')

router.use('/api/user', users.routes(), users.allowedMethods())
router.use('/api/book', book.routes(), book.allowedMethods())
router.use('/api/comment', comment.routes(), comment.allowedMethods())

module.exports = router
