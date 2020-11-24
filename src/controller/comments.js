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
  doGetComment,
  doGetReply,
  doDotGive,
  doDeleteLike,
  doDeleteComment
} = require('../modular/comments.js')
const { get } = require("../redis")
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
async function getComment ({book_id, pageSize, pageNo}) {
  if (!book_id) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  const result = await doGetComment(book_id, pageSize, pageNo, info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 3003,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取回复
 * @param {int} comment_id 评论id
 * @param {int} pageSize 每页条数
 * @param {int} pageNo 页数
 */
async function getReply({comment_id, pageSize, pageNo}) {
  if (!comment_id || !pageSize || !pageNo) return new ErrorModal(requestParams)
  const result = await doGetReply({
    comment_id,
    pageSize,
    pageNo
  })
  if (result && result.error) {
    return new ErrorModal({
      code: 3004,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 点赞
 * @param {int} comment_id 评论id
 */
async function dotGive(comment_id) {
  if (!comment_id) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  const result = await doDotGive(comment_id, info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 3005,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}

/**
 * 取消点赞
 * @param {int} comment_id 评论id
 */
async function deleteLike (comment_id) {
  if (!comment_id) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  const result = await doDeleteLike(comment_id, info.id)
  if (result && result.error) {
    return new ErrorModal({
      code: 3006,
      message: reuslt.error
    })
  } else {
    return new SuccessModal()
  }
}

/**
 * 删除评论
 * @param {int} comment_id
 */
async function deleteComment (comment_id) {
  if (!comment_id) return new ErrorModal(requestParams)
  const result = await doDeleteComment(comment_id)
  if (result && result.error) {
    return new ErrorModal({
      code: 3007,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}
module.exports = {
  addComment,
  addReply,
  getComment,
  getReply,
  dotGive,
  deleteLike,
  deleteComment
}