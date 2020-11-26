/**
 * @abstract 我的模块modular
 * @author taoyawei
 */

const {Users, Book_lists, Collections, Fans} = require('../db/model/index.js')
const {resultHandle} = require('../utils/utils.js')

/**
 * 获取用户信息
 * @param {int} id 用户id
 */
async function doGetUser (id) {
  try {
    const result = await Users.findOne({
      where: {
        id
      },
      include: [
        {
          model: Collections // 多对多查询，获取收藏的图书信息
        },
        {
          model: Book_lists, // 一对多查询，获取本人上传的图书
          where: {
            user_id: id
          },
          required: false
        }
      ]
    })
    const obj = {
      id: result.id,
      head: result.head,
      nickName: result.nickName,
      fans_number: result.fans_number,
      mobile: result.mobile,
      collections_number: result.collections.length,
      book_lists_number: result.book_lists.length
    }
    return obj
  } catch(err) {
    // console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 获取我的粉丝信息
 * @param {int} id 我的id
 */
async function doGetFans (id) {
  try {
    const result = await Fans.findAll({
      where: {
        user_id: id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 获取我上传的图书
 * @param {int} id 我的id
 */
async function doGetBook (id) {
  try {
    const result = await Book_lists.findAll({
      where: {
        user_id: id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '连接错误'
    }
  }
}
module.exports = {
  doGetUser,
  doGetFans,
  doGetBook
}
