/**
 * @abstract 书单数据模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')

//book_lists
const Book_lists = seq.define('book_lists', {
  author: {
    type: Sequelize.STRING(64),
    allowNull: false,
    // unique: true,
    comment: '作者，不能为空'
  },
  book_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    comment: '书名，不能为空，唯一'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '内容，不能为空'
  },
  read_number: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: true,
    comment: '阅读数'
  },
  comment_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '评论数，默认值为0，不能为空'
  },
  // like_number: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  //   comment: '点赞数'
  // },
  collection_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '收藏数'
  },
  circle_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: '圈子id，书对应的圈子，可以不再圈子里面，一本书最多对应一个圈子'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '上传书的用户id，不能为空'
  },
  createAt: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      const createAt = this.getDataValue('createAt')
      return createAt
    },
    set(createAt) {
      return this.setDataValue('createAt', createAt)
    }
  }
  // create_time: {
  //   type: Sequelize.DATE,
  //   allowNull: false,
  //   comment: '创建时间'
  // }
})
module.exports = Book_lists
