/**
 * @abstract 评论模块的controller
 * @author taoyawei
 */

const { ErrorModal, SuccessModal } = require("../utils/response")
const {
  requestFind,
  requestParams
} = require('../utils/errorInfo.js')
const {
  doAddComment,
  doAddReply,
  doGetComment
} = require('../modular/comments.js')
/**
 * 添加评论
 * @param {string} content 内容
 * @param {date} create_time 创建时间
 * @param {int} user_id 用户id
 * @param {string} user_name 用户名
 * @param {int} book_id 图书id
 */
async function addComment ({content, create_time, user_id, user_name, book_id}) {
  if (!content || !create_time || !user_id || !user_name || !book_id) return new ErrorModal(requestParams)
  const result = await doAddComment({
    content,
    create_time,
    user_id,
    user_name,
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

/**
 * 添加回复
 * @param {string} content 内容
 * @param {int} user_id 用户id
 * @param {string} user_name 用户名
 * @param {int} comment_id 上级评论id
 */
async function addReply ({content, user_id, user_name, comment_id}) {
  if (!content || !user_id || !user_name || !comment_id) return new ErrorModal(requestParams)
  const result = await doAddReply({
    content,
    user_id,
    user_name,
    comment_id
  })
  if (result && result.error) {
    return new ErrorModal({
      code: 3002,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取评论
 * @param {int} book_id 书本id
 */
async function getComment ({book_id, pageSize, PageNo}) {
  if (!book_id) return new ErrorModal(requestParams)
  const result = await doGetComment(book_id, pageSize, pageNo)
  if (result && result.error) {
    return new ErrorModal({
      code: 3003,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}
module.exports = {
  addComment,
  addReply,
  getComment
}