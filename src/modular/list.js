/**
 * @abstract 排行模块的modular
 * @author taoyawei
 */
const {
  Users,
  Book_lists,
  Circle,
  Fans
} = require('../db/model/index.js')
const {resultHandle} = require('../utils/utils.js')
/**
 * 获取用户列表
 * @param {*} pageNo 页数
 * @param {*} pageSize 每页条数
 */
async function doGetUser (pageNo, pageSize, id) {
  try {
    const result = await Users.findAll({
      attributes: ['id', 'head', 'nickName', 'fans_number', 'mobile'],
      order: [['fans_number', 'DESC']],
      limit: pageSize,
      offset: (pageNo - 1) * pageSize,
      include: [ // 多对多查询
        {
          model: Fans,
          where: {
            fans_id: id
          },
          required: false // 这个参数就是解决子查询的where导致父查询收到影响
        }
      ]
    })
    const arr = []
    result.forEach(item => {
      const obj = {}
      obj.id = item.id
      obj.head = item.head
      obj.nickName = item.nickName
      obj.fans_number = item.fans_number
      obj.mobile = item.mobile
      if (item.Fans.length > 0) obj.isFollow = true
      else obj.isFollow = false
      arr.push(JSON.parse(JSON.stringify(obj)))
    })
    return resultHandle(arr)
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 获取书本排行, 根据收藏数
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function doGetBook(pageNo, pageSize) {
  try {
    const result = await Book_lists.findAll({
      attributes: ['id', 'author', 'book_name', 'content', 'read_number', 'comment_number', 'collection_number', 'circle_id', 'user_id'],
      order: [['collection_number', 'DESC']],
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
 * 获取圈子排行榜(根据加入人数)
 * @param {int} pageNo 页数
 * @param {int} pageSize 每页条数
 */
async function doGetCircle (pageNo, pageSize) {
  try {
    const result = await Circle.findAll({
      order: [['circle_number', 'DESC']],
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
module.exports = {
  doGetUser,
  doGetBook,
  doGetCircle
}
