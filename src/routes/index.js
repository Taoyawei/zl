/**
 * @abstract 路由整合文件
 * @author taoyawei
 */
const router = require('koa-router')()
const users = require('./users.js')

router.use('/api/user', users.routes(), users.allowedMethods())

module.exports = router
