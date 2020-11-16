const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-session')
const redisStore = require('koa-redis')
const { REDIS_CONFIG } = require('./config/db.js')
const routes = require('./routes/index.js')
const path = require('path')
// const index = require('./routes/index')
// const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text', 'form-data']
// }))
app.use(koaBody({
  multipart: true, // 是否支持上传
  // encoding: 'gzip', // 支持压缩
  formidable: { // 对于上传文件的配置
    // uploadDir: path.join(__dirname, 'public/upload'), // 设置文件上传目录
    keepExtensions: true, // 保持文件上传的后缀
    // maxfieldsSize:  // 文件上传大小设置
    onFileBegin: (name, file) => { // 文件上传之前的设置
      // console.log(file)
    }

  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(routes.routes(), routes.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
// 配置session
app.keys = ['UIsdf_7878#$']
app.use(session({
  key: 'zhile.sid',
  prefix: 'zhile:sess',
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  store: redisStore({
    all: `${REDIS_CONFIG.port}:${REDIS_CONFIG.host}`
  })
}, app))
module.exports = app
