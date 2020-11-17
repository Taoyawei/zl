/**
 * @abstract 整个数据模型出口，在此处建立各表之间的关系，比如外键
 * @author taoyawei
 */
const Users = require('./user.js')
const Book_lists = require('./book_list.js')
const Circle = require('./circle.js')
const Comments = require('./comment.js')
const User_circle = require('./user_circle.js')
const Fans = require('./fans.js')
const Collections = require('./collection.js')

/**
 * 用户与书之间的关系，是一对多的关系
 */
Users.hasMany(Book_lists, { // users有很多个Book_lists，一个人可以上传很多本书
  foreignKey: 'user_id'
})
Book_lists.belongsTo(Users, { // 一个Book_lists属于一个Users，一本书只能由一个人上传
  foreignKey: 'user_id'
})

/**
 * 用户与收藏书之间的关系，多对多关系
 */
Users.belongsToMany(Collections, {
  through: 'user_collections'
})
Collections.belongsToMany(Users, {
  through: 'user_collections'
})

/**
 * 用户与评论之间的关系，是一对多
 */
Users.hasMany(Comments, { // 一个用户有多条评论
  foreignKey: 'user_id'
})
Comments.belongsTo(Users, { // 一条评论对应一个用户
  foreignKey: 'user_id'
})

/**
 * 书单与评论表之间的关系，一本书多个评论，一个评论对应一本书，一对多
 */
Book_lists.hasMany(Comments, {
  foreignKey: 'book_id'
})

Comments.belongsTo(Book_lists, {
  foreignKey: 'book_id'
})

/**
 * 用户和圈子之间的关系分为两种，创建关系和加入关系
 * 创建关系：一个用户可以创建，多个圈子，但一个圈子只能由一个用户创建
 */
Users.hasMany(Circle, {
  foreignKey: 'create_id',
})
Circle.belongsTo(Users, {
  foreignKey: 'create_id'
})

/** 
* 加入关系：一个用户可以加入多个圈子，一个圈子也可以有多个用户，多对多
* 多对多两种方法，一种连接中间表，还有一种直接使用sequelize的belongsToMany，我们选择后一种，也需要中间表，只是可以自动生成。
* 而我们使用自己创建的
*/
Users.belongsToMany(Circle, {
  through: 'User_circle'
})
Circle.belongsToMany(Users, {
  through: 'User_circle'
})

/**
 * 圈子和书也是多对多，一个圈子多本书，一本书可以适合多个圈子，我们这里使用sequelize自动创建中间表
 */
Circle.belongsToMany(Book_lists, {
  through: 'Circle_book'
})
Book_lists.belongsToMany(Circle, {
  through: 'Circle_book'
})

/**
 * 前端有个关注按钮，关注了我的就是我的粉丝，我关注的也应该是个列表， 那应该多对多
 */
// Users.hasMany(Fans, {
//   foreignKey: 'user_id'
// })
// Fans.belongsTo(Users, {
//   foreignKey: 'user_id'
// })
Users.belongsToMany(Fans, {
  through: 'User_fans'
})
Fans.belongsToMany(Users, {
  through: 'User_fans'
})

module.exports = {
  Users,
  Book_lists,
  Circle,
  Comments,
  Fans,
  User_circle,
  Collections
}
