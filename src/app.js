const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const redisStore = require('koa-redis')
const { REDIS_CONFIG } = require('./config/db.js')
const routes = require('./routes/index.js')
// const index = require('./routes/index')
// const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
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
