/**
 * @abstract 评论表数据模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')

// 评论表
const Comments = seq.define('comments', {
  create_time: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '创建评论时间，不能为空'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '评论，不能为空'
  },
  like_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '点赞数，不能为空，默认值为0'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '用户id，不能为空'
  },
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '书单id，不能为空'
  }
})
module.exports = Comments
