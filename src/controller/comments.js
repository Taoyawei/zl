/**
 * @abstract 评论模块的controller
 * @author taoyawei
 */

const { ErrorModal, SuccessModal } = require("../utils/response")
const {
  requestFind
} = require('../utils/errorInfo.js')
const {
  doAddComment
} = require('../modular/comments.js')
/**
 * 添加评论
 * @param {string} content 内容
 * @param {date} create_time 创建时间
 * @param {int} user_id 用户id
 * @param {int} book_id 图书id
 */
async function addComment ({content, create_time, user_id, book_id}) {
  const result = await doAddComment({
    content,
    create_time,
    user_id,
    book_id
  })
  if (!result) {
    return new ErrorModal(requestFind)
  } else if (result && result.error) {
    return new ErrorModal({
      code: 3001,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
module.exports = {
  addComment
}