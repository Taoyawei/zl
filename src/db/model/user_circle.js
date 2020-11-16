/**
 * @abstract 用户，圈子中间表
 * @author taoyawei
 */

const seq = require('../seq.js')
const Sequelize = require('sequelize')

// user_circle
const User_circle = seq.define('User_circle', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id，不能为空'
  },
  circle_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '圈子id，不能为空'
  }
})
module.exports = User_circle
