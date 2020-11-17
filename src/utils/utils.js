/**
 * @abstract 一些公共方法
 * @author taoyawei
 */

// 毫秒值转换成yy-mm-dd hh:mm:ss格式日期
function dateTrans (val) {
  const date = new Date(val)
  const year = date.getFullYear() // 年
  const month = date.getMonth() + 1 // 月
  const day = date.getDate() // 日
  const hour = date.getHours() // 时
  const minutes = date.getMinutes() // 分
  const s = date.getSeconds() // 秒
  return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day} ${hour > 9 ? hour : '0' + hour}:${minutes > 9 ? minutes : '0' + minutes}:${s > 9 ? s : '0' + s}`
}

module.exports = {
  dateTrans
}
