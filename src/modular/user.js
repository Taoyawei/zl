/**
 * @abstract 用户信息操作
 * @author taoyawei
 */
const { Users } = require('../db/model/index.js')
const { model } = require('../db/seq.js')
/**
 * 获取用户
 * @param {string} mobile 手机号码
 * @param {string} password 密码
 */
async function getUser (mobile, password) {
  // 查询条件
  const whereopt = {
    mobile
  }
  if (password) Object.assign(whereopt, { password })
  // 查询
  const result = await Users.findOne({
    attributes: ['id', 'mobile', 'nickName', 'head', 'fans_number', 'integral'], // 返回的字段
    where: whereopt // 查询条件
  })
  if (!result) return result
  return result.dataValues
}

/**
 * 注册，插入一条数据
 * @params {string} mobile 手机号
 * @params {string} nickName 昵称
 * @params {string} password 密码
 */
async function createUser ({mobile, nickName, password}) {
  const result = await Users.create({
    mobile,
    nickName,
    password
  })
  return result.dataValues
}

module.exports = {
  getUser,
  createUser
}
