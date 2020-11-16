/**
 * @abstract 登录模块
 * @author taoyawei
 */
import React, { Component } from 'react'
import Shar from './shar.jsx'
import './scss/login.scss'
class Login extends Component {
  render () {
    return (
      <div className="login">我是登录页</div>
    )
  }
}

export default Shar(Login)
