/**
 * @abstract 关于图书的操作
 * @author taoyawei
 */
const { Book_lists, Collections } = require('../db/model/index.js')
const {dateTrans} = require('../utils/utils.js')
const {Op} = require('sequelize')
/**
 * 保存图书信息
 * @param {string} book_name 书名
 * @param {string} author 作者
 */
async function doSetBook ({book_name, author, user_id}) {
  const date = (new Date()).getTime()
  try {
    const result = await Book_lists.create({
      book_name,
      content: book_name,
      author,
      user_id,
      createAt: date
    })
    return result
  } catch(err) {
    // console.log('/////')
    console.log(err)
    return {
      error: err && err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 获取用户收藏的图书信息
 * @param {int} user_id 用户id
 */
async function doGetCollection (user_id) {
  try {
    const result = await Collections.findAll({
      where: {
        user_id
      }
    })
    if (result.dataValues) return result.dataValues
    else return []
  } catch(err) {
    return {
      error: err && err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 更据创建时间获取图书列表
 * @param {string} startDate
 * @param {string} endDate
 */
async function doGetDateBook ({startDate, endDate}) {
  console.log(dateTrans(startDate))
  try {
    const result = await Book_lists.findAll({
      attributes: ['id', 'book_name', 'author', 'read_number', 'comment_number', 'collection_number', 'circle_id', 'user_id', 'createAt'],
      where: {
        createAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    })
    console.log('***********')
    console.log(result)
    if (result) return result
    else return []
  } catch(err) {
    // console.log('**********')
    console.log(err)
    return {
      error: err && err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doSetBook,
  doGetCollection,
  doGetDateBook
}