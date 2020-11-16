/**
 * @abstract 用户数据模型
 * @author taoyawei
 */
const Sequelize = require('sequelize')
const seq = require('../seq.js')

// users
const Users = seq.define('users', {
  head: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: '头像'
  },
  nickName: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: '昵称'
  },
  fans_number: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '粉丝数'
  },
  integral: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '积分'
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '手机号，不能为null，唯一'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码，不能为空，不唯一'
  }
})

module.exports = Users
