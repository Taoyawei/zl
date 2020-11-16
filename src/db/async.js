/**
 * @abstract 链接数据库
 * @author taoyawei
 */
const seq = require('./seq.js')
require('./model/index.js') // 数据库模型引入

// 链接
seq.authenticate().then(() => {
  console.log('链接成功')
}).catch((err) => {
  console.log('链接失败:' + err)
})
// 同步数据库
seq.sync({ foreach: true }).then(() => {
  console.log('OK')
  process.exit()
})
