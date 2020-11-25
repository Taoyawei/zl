/**
 * @abstract 用户信息操作
 * @author taoyawei
 */
const { Users, Fans } = require('../db/model/index.js')
const { get } = require('../redis/index.js')
const doCrypto = require('../utils/cryp.js')
const { resultHandle } = require('../utils/utils.js')
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
  return resultHandle(result)
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
  return resultHandle(result)
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
    return resultHandle(result)
  } catch(err) {
    console.log(err)
    return false
  }
}

/**
 * 关注用户
 * @param {int} user_id 用户id
 * @param {int} fans_id 粉丝id
 */
async function doGoFollow (user_id, fans_id) {
  try {
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    })
    const findFans = await Fans.findOne({
      where: {
        user_id,
        fans_id
      }
    })
    if (!user) return { error: '该用户不存在' }
    if (findFans) return { error: '粉丝已关注' }
    const fans = await Fans.create({
      user_id,
      fans_id
    })
    // 用户粉丝中间表添加数据
    await fans.addUsers(user)
    // 有粉丝的用户的粉丝数加一
    await user.increment({
      'fans_number': 1
    })
    return resultHandle(fans)
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 取消关注
 * @param {int} user_id 被关注的用户id
 * @param {int} id 本用户id
 */
async function doRemoveFollow (user_id, id) {
  try {
    
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  getUser,
  createUser,
  domodify,
  doGoFollow,
  doRemoveFollow
}
