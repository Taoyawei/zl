/**
 * @abstract 评论模块的model
 * @author taoyawei
 */
const {Comments} = require('../db/model/index.js')

 /**
  * 添加评论
  * @param {string} content 内容
  * @param {date} create_time 创建时间
  * @param {int} user_id 用户id
  * @param {int} book_id 图书id
  */
async function doAddComment ({content, create_time, user_id, book_id}) {
  try {
    const result = await Comments.create({
      content,
      create_time,
      user_id,
      book_id
    })
    if (result instanceof Array) {
      return result
    } else {
      return result ? result.dataValues : []
    }
  } catch(err) {
    return {
      error: err && err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddComment
}
