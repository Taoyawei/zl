/**
 * @abstract 图书模块转换器
 * @author taoyawei
 */
const fs = require('fs')
const { get } = require('../redis/index.js')
const {
  doSetBook,
  doGetCollection,
  doGetDateBook,
  doGetBookInfo,
  doCollectionBook,
  doAddCircle
} = require('../modular/book.js')
const {
  SuccessModal, ErrorModal
} = require('../utils/response')
const {
  requestParams,
  requestFind
} = require('../utils/errorInfo.js')

/**
 * 上传图书保存至本地
 * @param {file} file 上传的文件
 */
async function updataBook (file) {
  const info = await get('userInfo')
  const reader = fs.createReadStream(file.path) // 创建可读流
  const ext = file.name.split('.').pop() // 获取上传文件后缀
  const name = file.name.split('.')[0] + '&' + info.id // 文件名的组成是上传文件名字加上上传用户id
  const upStream = fs.createWriteStream(`public/upload/${name}.${ext}`)
  reader.pipe(upStream)
  return new SuccessModal()
}

/**
 * 存入图书信息
 * @param {string} book_name 书名
 * @param {string} author 作者
 */
async function setBook ({ book_name, author }) {
  if (!book_name || !author) return new ErrorModal(requestParams)
  const info = await get('userInfo')
  const result = await doSetBook({
    book_name,
    author,
    user_id: info.id
  })
  if (!result) {
    return new ErrorModal(requestFind)
  } else if (result && result.error) {
    return new ErrorModal({
      code: 2003,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}

/**
 * 根据用户id获取收藏的书籍信息
 */
async function getCollection () {
  const info = await get('userInfo')
  const result = await doGetCollection(info.id)
  if (!result) {
    return new ErrorModal(requestFind)
  } else if (result && result.error) {
    return new ErrorModal({
      code: 2004,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 根据上传日期获取书单
 * @param {int} startDate 开始日期
 * @param {int} endDate 结束日期
 */
async function getDateBook ({startDate, endDate}) {
  const result = await doGetDateBook({startDate, endDate})
  if (!result) {
    return new ErrorModal(requestFind)
  } else if (result && result.error) {
    return new ErrorModal({
      code: 2005,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 获取书籍信息
 * @param {string} book_id 图书id
 */
async function getBookInfo ({book_id}) {
  const result = await doGetBookInfo(book_id)
  if (!result) {
    return new ErrorModal(requestFind)
  } else if (result && result.error) {
    return new ErrorModal({
      code: 2006,
      message: result.error
    })
  } else {
    return new SuccessModal(result)
  }
}

/**
 * 收藏图书
 * @param {string} book_name 书名
 * @param {string} author 作者
 * @param {int} user_id 收藏用户id
 * @param {int} updata_id 上传图书用户的id
 */
async function collectionBook ({book_name, author, user_id, updata_id}) {
  if (!book_name || !author || !user_id || !updata_id) return new ErrorModal(requestParams)
  const result = await doCollectionBook({
    book_name,
    author,
    user_id,
    updata_id
  })
  if (result && result.error) {
    return new ErrorModal({
      code: 2007,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}

/**
 * 图书添加到圈子里面
 * @param {int} circle_id 圈子id
 * @param {int} id 图书id
 */
async function addCircle(circle_id, id) {
  if (!circle_id) return new ErrorModal(requestParams)
  const result = await doAddCircle(circle_id, id)
  if (result && result.error) {
    return new ErrorModal({
      code: 2008,
      message: result.error
    })
  } else {
    return new SuccessModal()
  }
}
module.exports = {
  updataBook,
  setBook,
  getCollection,
  getDateBook,
  getBookInfo,
  collectionBook,
  addCircle
}
