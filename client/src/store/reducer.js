/**
 * @abstract redux配置
 * @author taoyawei
 */
const defaultValue = {
  urlInfo:[], // 跳转的路由，做成栈的数据结构，先进后出
  headInfo: {} // 当前头部信息
}
const reducer = (state=defaultValue, action={}) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'urlAdd': // 添加路由
      newState.urlInfo.unshift(action.value)
      break
    case 'urlReduce': // 跳转完成后删除该路由
      newState.urlInfo.shift()
      break
    case 'urlDelete': // 跳转到主页清空并初始化
      newState.urlInfo = []
      // newState.urlInfo.push(action.value)
      break
    case 'heade':
      delete newState.headInfo
      newState.headInfo = action.value
      break
    default:
      console.log('不操作')
      break
  }
  return newState
}
export default reducer
