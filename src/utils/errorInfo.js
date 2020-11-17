/**
 * @abstract 项目中的错误对应的信息
 * @author taoyawei
 */

module.exports = {
    // 参数不完整
    requestParams: {
        code: 1000,
        message: '参数不完整'
    },
    requestFind: {
        code: 2000,
        message: '查询错误'
    },
    // 用户名已存在
    registerUserNameExistInfo: {
        code: 10001,
        message: '用户名已存在'
    },
    // 注册失败
    registerFailInfo: {
        code: 10002,
        message: '注册失败，请重试'
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        code: 10003,
        message: '用户名未存在'
    },
    // 登录失败
    loginFailInfo: {
        code: 10004,
        message: '登录失败，用户名或密码错误'
    },
    // 未登录
    loginCheckFailInfo: {
        code: 10005,
        message: '您尚未登录'
    },
    // 修改密码失败
    changePasswordFailInfo: {
        code: 10006,
        message: '修改密码失败，请重试'
    },
    // 上传文件过大
    uploadFileSizeFailInfo: {
        code: 10007,
        message: '上传文件尺寸过大'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        code: 10008,
        message: '修改基本信息失败'
    },
    // json schema 校验失败
    jsonSchemaFileInfo: {
        code: 10009,
        message: '数据格式校验错误'
    },
    // 删除用户失败
    deleteUserFailInfo: {
        code: 10010,
        message: '删除用户失败'
    },
    // 添加关注失败
    addFollowerFailInfo: {
        code: 10011,
        message: '添加关注失败'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        code: 10012,
        message: '取消关注失败'
    },
    // 创建微博失败
    createBlogFailInfo: {
        code: 11001,
        message: '创建微博失败，请重试'
    },
    // 删除微博失败
    deleteBlogFailInfo: {
        code: 11002,
        message: '删除微博失败，请重试'
    }
}
