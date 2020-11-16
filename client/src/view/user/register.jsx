/**
 * @abstract 注册页面
 * @author taoyawei
 */
import React, { Component } from 'react'
import Shar from './shar.jsx'
// import { Button } from 'antd-mobile'
import './scss/register.scss'
// import '../../font/iconfont.css'
import {
  InputItem
} from 'antd-mobile'
class Register extends Component {
  render() {
    return (
      <div className="register">
        <div className="register-header">欢迎注册</div>
        <i className="iconfont">&#xe681;</i>
        <div class="register-content">
          <InputItem className="register-mobile" />
          <InputItem className="register-mobile" />
        </div>
      </div>
    )
  }
}
export default Shar(Register)
