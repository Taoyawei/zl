/**
 * @abstract 圈子模块modular
 * @author taoyawei
 */
const {resultHandle} = require('../utils/utils.js')
const {Circle, Book_lists, Users} = require('../db/model/index.js')
const { ErrorModal } = require('../utils/response.js')

/**
 * 新建圈子
 * @param {string} cricle_type 圈子类型, 就是圈子名字
 * @param {date} create_time 创建时间
 * @param {int} create_id 创建人id
 * @param {string} brief 圈子简介 
 */
async function doCreateCricle ({circle_type, create_time, create_id, brief}) {
  try {
    const info = await Circle.findOne({ // 先查看有没有这个类型的圈子，类型就是名字，必须唯一
      where: {
        circle_type
      }
    })
    if (info) {
      return {
        error: '该圈子已存在'
      }
    }
    const result = await Circle.create({
      circle_type,
      create_time,
      create_id,
      brief
    })
    // 圈子表加入数据后我们要将圈子和用户关联起来
    const user = await Users.findOne({
      where: {
        id: create_id
      }
    })
    await result.addUsers(user)
    return result
    // return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 根据用户id获取圈子
 * @param {int} create_id
 */
async function doFindCircle (create_id) {
  try {
    const result = await Circle.findAll({
      attributes: ['id', 'circle_type', 'create_time', 'circle_number', 'create_id', 'brief'],
      where: {
        create_id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 根据圈子id获取图书
 * @param {int} circle_id 圈子id
 */
async function doGetBook (circle_id) {
  try {
    const result = await Book_lists.findAll({
      attributes: ['id', 'book_name', 'author', 'read_number', 'comment_number', 'collection_number', 'circle_id', 'user_id'],
      where: {
        circle_id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 用户加入圈子
 * @param {int} user_id 用户id
 * @param {int} circle_id 圈子id
 */
async function doAddCircle (user_id, circle_id) {
  try {
    const circle = await Circle.findOne({
      where: {
        id: circle_id
      }
    })
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    })
    if (!circle) return {
      error: '圈子不存在'
    }
    if (!user) return {
      error: '用户不存在'
    }
    // 圈子人数加1
    circle.increment({
      'circle_number': 1
    })
    const result = await circle.addUsers(user) // 多对多添加关联
    // const user = await Users.findAll()
    // console.log('*********')
    // console.log(await circle.getUsers())
    return resultHandle(result)
    // return await circle.getUsers() // 获取多对多数据
  } catch(err) {
    console.log(err)
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 根据圈子id获取用户
 * @param {int} circle_id
 */
async function doGetUser (circle_id) {
  try {
    // 先获取圈子
    const circle = await Circle.findOne({
      where: {
        id: circle_id
      }
    })
    // 使用get方法获取对应的用户
    const result = await circle.getUsers()
    return resultHandle(result)
  } catch(err) {
    return {
      error:  err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 根据用户id获取圈子
 * @param {int} user_id 用户id
 */
async function doGetCircle (user_id) {
  try {
    // 获取用户对象
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    })
    const result = await user.getCircles()
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}

/**
 * 删除圈子
 * @param {int} create_id 创建人id
 * @param {int} circle_id 圈子id
 */
async function doDeleteCircle({create_id, circle_id}) {
  try {
    // 获取圈子
    const circle = await Circle.findOne({
      where: {
        id: circle_id
      }
    })
    // 获取用户
    // const user = await Users.findOne({
    //   where: {
    //     id: create_id
    //   }
    // })
    if (!circle) return {
      error: '圈子不存在'
    }
    // if (!user) return {
    //   error: '用户不存在'
    // }
    // 先删除圈子和用户中间表中的数据
    await circle.removeUsers()
    // 删除圈子
    const result = await Circle.destroy({
      where: {
        id: circle_id
      }
    })
    return resultHandle(result)
  } catch(err) {
    return {
      error: err.errors ? err.errors[0].message : '链接错误'
    }
  }
}
module.exports = {
  doCreateCricle,
  doFindCircle,
  doGetBook,
  doAddCircle,
  doGetUser,
  doGetCircle,
  doDeleteCircle
}
