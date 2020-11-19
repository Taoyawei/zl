/**
 * @abstract 评论回复表
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
const Reply = seq.define('replys', {
  cotent: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '回复内容'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '用户名'
  },
  comment_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '回复对应的评论id'
  }
})

module.exports = Reply
