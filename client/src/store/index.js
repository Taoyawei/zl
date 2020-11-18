/**
 * @abstract redux配置
 * @author taoyawei
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer.js'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
