/**
 * @abstract 关于图书的操作
 * @author taoyawei
 */
const { Book_lists, Collections, Comments } = require('../db/model/index.js')
const {dateTrans} = require('../utils/utils.js')
const {Op} = require('sequelize')
const fs = require('fs')
const path = require('path')
const { resultHandle } = require('../utils/utils.js')
const { ErrorModal } = require('../utils/response.js')
const { requestParams } = require('../utils/errorInfo.js')
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
    return resultHandle(result)
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
    return resultHandle(result)
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
    // if (result) return result
    // else return []
    return resultHandle(result)
  } catch(err) {
    return {
      error: err && err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 根据图书id获取图书完全信息
 * @param {string} book_id 图书id
 */
async function doGetBookInfo (book_id) {
  try {
    const result = await Book_lists.findOne({
      attributes: ['id', 'author', 'book_name', 'read_number', 'comment_number', 'collection_number', 'circle_id', 'user_id'],
      where: {
        id: book_id
      },
      include:[{
        model: Comments,
        attributes: ['id', 'create_time', 'content', 'like_number', 'user_id', 'book_id']
      }]
    })
    let data = null
    if (result instanceof Array) {
      data = result
    } else {
      data = result ? result.dataValues : []
    }
    if (!(data instanceof Array)) {
      const fileList = []
      let filepath = 'public/upload/总结&3.txt'
      const files = fs.readdirSync('public/upload')
      files.forEach((item) => {
        fileList.push(item)
      })
      fileList.forEach((res) => {
        const arr = JSON.parse(JSON.stringify(res.split('.')[0].split('&')))
        if (Number(arr[1]) === data.user_id && arr[0] === data.book_name) {
          filepath = `public/upload/${res}`
        }
      })
      const content = fs.readFileSync(filepath).toString()
      data.content = content
    }
    return data
  } catch(err) {
    console.log(err)
    return {
      error: err && err.errors ? err.error[0].message : '链接错误'
    }
  }
}

/**
 * 收藏书本
 * @param {string} book_name 书名
 * @param {string} author 作者
 * @param {int} user_id 收藏用户id
 * @param {int} updata_id 上传用户id
 */
async function doCollectionBook ({book_id, book_name, author, user_id, updata_id}) {
  try {
    const book = await Book_lists.findOne({
      where: {
        id: book_id
      }
    })
    if (!book) return {
      error: '该书不存在'
    }
    // 先查询再存储
    const findValue = await Collections.findOne({
      where: {
        book_name,
        user_id
      }
    })
    if (findValue) {
      const data = {
        error: '此书已经被收藏'
      }
      return data
    }
    const result = await Collections.create({
      book_id,
      book_name,
      author,
      user_id,
      updata_id
    })
    // 书本被收藏，图书收藏书响应加1
    book.increment({
      'collection_number': 1
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err && err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 取消收藏
 * @param {int} book_id 图书id
 * @param {int} user_id 收藏用户id
 */
async function doCancleBook (book_id, user_id) {
  try {
    const book = await Book_lists.findOne({
      where: {
        id: book_id
      }
    })
    if (!book) return {
      error: '图书不存在'
    }
    const result = await Collections.destroy({
      where: {
        user_id,
        book_id
      }
    }) 
    // 图书收藏数减1
    await book.decrement({
      'collection_number': 1
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 图书添加到圈子
 * @param {int} circle_id 圈子id
 * @param {int} id 图书id
 */
async function doAddCircle (circle_id, id) {
  try {
    const info = await Book_lists.findOne({
      where: {
        circle_id,
        id
      }
    })
    if (info) return {
      error: '本书已经存在该圈子'
    }
    const item = {
      circle_id
    }
    const result = await Book_lists.update(item, {
      where: {
        id
      }
    })
    console.log(result)
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doSetBook,
  doGetCollection,
  doGetDateBook,
  doGetBookInfo,
  doCollectionBook,
  doAddCircle,
  doCancleBook
}