/**
 * @abstract 用户，粉丝中间表，这个表很特殊，因为用户粉丝都对应用户表，所以是user和user的中间表
 * @author taoyawei
 */

const seq = require('../seq.js')
const Sequelize = require('sequelize')

// Fans
const Fans = seq.define('Fans', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id，不能为空'
  },
  fans_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '粉丝id，不能为空，其实粉丝也是用户'
  }
})
module.exports = Fans
