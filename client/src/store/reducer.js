/**
 * @abstract redux配置
 * @author taoyawei
 */
const defaultValue = {
  urlInfo:[] // 跳转的路由，做成栈的数据结构，先进后出
}
const reducer = (state=defaultValue, action={}) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'urlAdd':
      newState.urlInfo.unshift(action.value)
      break
    case 'urlReduce':
      newState.urlInfo.shift()
      break
    case 'urlDelete':
      newState.urlInfo = []
      newState.urlInfo.push(action.value)
      break
    default:
      console.log('不操作')
      break
  }
  return newState
}
export default reducer
