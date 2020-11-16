/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()
const users = require('./users.js')
const book = require('./book.js')

router.use('/api/user', users.routes(), users.allowedMethods())
router.use('/api/book', book.routes(), book.allowedMethods())

module.exports = router
