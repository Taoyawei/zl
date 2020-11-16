/**
 * @abstract 用户信息操作
 * @author taoyawei
 */
const { Users } = require('../db/model/index.js')
const { get } = require('../redis/index.js')
const doCrypto = require('../utils/cryp.js')
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
 * @param {string} mobile 手机号
 * @param {string} nickName 昵称
 * @param {string} password 密码
 */
async function createUser ({mobile, nickName, password}) {
  const result = await Users.create({
    mobile,
    nickName,
    password
  })
  return result.dataValues
}

/**
 * 修改密码
 * @param {string} mobile 手机号
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function domodify ({mobile, password, newPassword}) {
  const info = await get('userInfo')
  const whereopt = {
    mobile,
    id: info.id
  }
  try {
    const item = {
      password: doCrypto(newPassword)
    }
    const result = await Users.update(item, {
      where: whereopt
    })
    console.log('0')
    return result
  } catch(err) {
    console.log(err)
    return false
  }
}
module.exports = {
  getUser,
  createUser,
  domodify
}
