/**
 * @abstract 点赞表模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')

const Likes = seq.define('likes', {
  comment_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '点赞对应评论的id'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '点赞对应用户id'
  }
})

module.exports = Likes
