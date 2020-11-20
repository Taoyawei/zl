/**
 * @abstract 评论模块的model
 * @author taoyawei
 */
const {Comments, Reply, Likes} = require('../db/model/index.js')
const { resultHandle } = require('../utils/utils.js')

 /**
  * 添加评论
  * @param {string} content 内容
  * @param {date} create_time 创建时间
  * @param {int} user_id 用户id
  * @param {int} book_id 图书id
  */
async function doAddComment ({content, create_time, user_id, user_name, book_id}) {
  try {
    const findResult = await Comments.findOne({
      where: {
        content,
        user_id,
        book_id
      }
    })
    if (findResult) return {error: '该评论已经存在'}
    const result = await Comments.create({
      content,
      create_time,
      user_id,
      user_name,
      book_id
    })
    return resultHandle(result)
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
    const findResult = await Reply.findOne({
      where: {
        cotent: content,
        user_id, 
        comment_id
      }
    })
    if (findResult) return {error: '该回复已存在'}
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
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 获取评论
 * @param {int} book_id 书本id
 */
async function doGetComment (book_id, pageSize, pageNo, id) {
  try {
    const result = await Comments.findAll({
      attributes: ['user_name', 'create_time', 'content', 'like_number', 'user_id', 'book_id', 'reply_number'],
      where: {
        book_id
      },
      include: [{
        model: Likes,
        attributes: ['user_id']
      }],
      limit: pageSize, // 每页条数
      offset: (pageNo - 1) * pageSize // 跳过多少条，也就是第几页
    })
    if (result instanceof Array) {
      // return result
      const arr = []
      result.forEach(item => {
        const obj = {
          user_name: item.user_name,
          create_time: item.create_time,
          content: item.content,
          like_number: item.like_number,
          user_id: item.user_id,
          book_id: item.book_id,
          reply_number: item.reply_number
        }
        const list = item.likes.filter(res => res.user_id === id) // 筛选出这个评论的所有赞中又没有登陆的用户
        obj.isLike = list.length > 0
        arr.push(JSON.parse(JSON.stringify(obj)))
      })
      return arr
    } else {
      return result ? result.dataValues : []
    }
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 获取评论回复
 * @param {int} comment_id 评论id
 * @param {int} pageSize 每页条数
 * @param {int} pageNo 页数
 */
async function doGetReply({comment_id, pageSize, pageNo}) {
  try {
    const result = await Reply.findAll({
      where: {
        comment_id
      },
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 点赞
 * @param {int} comment_id 评论id
 * @param {int} user_id 用户id
 */
async function doDotGive(comment_id, user_id) {
  try {
    const findResult = await Likes.findOne({
      where: {
        comment_id,
        user_id
      }
    })
    if (findResult) return {
      error: '您已经点赞'
    }
    const result = await Likes.create({
      comment_id,
      user_id
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 取消点赞
 * @param {int} comment_id 评论id
 * @param {int} user_id 用户id
 */
async function doDeleteLike (comment_id, user_id) {
  try {
    const result = await Likes.destroy({
      where: {
        comment_id,
        user_id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doAddComment,
  doAddReply,
  doGetComment,
  doGetReply,
  doDotGive,
  doDeleteLike
}
