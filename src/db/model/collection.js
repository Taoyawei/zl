/**
 * @abstract 收藏表数据模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')

const Collections = seq.define('collections', {
  book_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '被收藏的书名，不能为空，唯一'
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '被收藏书的作者，不能为空，唯一'
  },
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '图书id，不能为空'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '收藏的用户id，不能为空'
  },
  updata_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '被收藏书上传人的id, 不能为空'
  }
})

module.exports = Collections
