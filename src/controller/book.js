/**
 * @abstract 图书模块转换器
 * @author taoyawei
 */
const fs = require('fs')
const { get } = require('../redis/index.js')

const {
  SuccessModal
} = require('../utils/response')

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

module.exports = {
  updataBook
}
