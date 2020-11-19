/**
 * @abstract 评论模块的model
 * @author taoyawei
 */
const {Comments, Reply} = require('../db/model/index.js')

 /**
  * 添加评论
  * @param {string} content 内容
  * @param {date} create_time 创建时间
  * @param {int} user_id 用户id
  * @param {int} book_id 图书id
  */
async function doAddComment ({content, create_time, user_id, user_name, book_id}) {
  try {
    const result = await Comments.create({
      content,
      create_time,
      user_id,
      user_name,
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

/**
 * 添加回复
 * @param {string} content 内容
 * @param {int} user_id 用户id
 * @param {string} user_name 用户名
 * @param {int} comment_id 评论id
 */
async function doAddReply ({content, user_id, user_name, comment_id}) {
  try {
    const result = await Reply.create({
      cotent: content,
      user_id,
      user_name,
      comment_id
    })
    // 添加回复，评论回复书自动加一, 先查到这条数据
    const comment = await Comments.findOne({
      where: {
        id: comment_id
      }
    })
    await comment.increment({
      'reply_number': 1
    })
    if (result instanceof Array) {
      return result
    } else {
      return result ? result.dataValues : []
    }
  } catch(err) {
    // console.log(err)
    return err.errors ? err.errors[0].message : '链接错误'
  }
}

/**
 * 获取评论
 * @param {int} book_id 书本id
 */
async function doGetComment (book_id, pageSize, pageNo) {
  try {
    const result = await Comments.findAll({
      attributes: ['user_name', 'create_time', 'content', 'like_number', 'user_id', 'book_id', 'reply_number'],
      where: {
        book_id
      },
      // include: [{
      //   model: Reply,
      //   attributes: ['cotent', 'user_id', 'user_name', 'comment_id']
      // }],
      limit: pageSize, // 每页条数
      offset: (pageNo - 1) * pageSize // 跳过多少条，也就是第几页
    })
    if (result instanceof Array) {
      return result
    } else {
      return result ? result.dataValues : []
    }
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddComment,
  doAddReply,
  doGetComment
}
