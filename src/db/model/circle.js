/**
 * @abstract 圈子数据模型
 * @author taoyawei
 */
const seq = require('../seq.js')
const Sequelize = require('sequelize')
// circle
const Circle = seq.define('circle', {
  circle_type: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
    comment: '圈子类型，不能为空，唯一'
  },
  create_time: {
    type: Sequelize.DATE,
    allowNull: false,
    comment: '创建圈子时间，不能为空'
  },
  circle_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '圈子人数，不能为空，默认值为0'
  },
  create_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '创建人id，不能为空'
  },
  brief: {
    type: Sequelize.STRING(64),
    allowNull: true,
    comment: '圈子简介，可为空'
  }
})
module.exports = Circle
