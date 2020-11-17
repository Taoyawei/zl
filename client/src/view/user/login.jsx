/**
 * @abstract 登录模块
 * @author taoyawei
 */
import React, { Component } from 'react'
import Shar from './shar.jsx'
import './scss/login.scss'
import Icon from '../component/icon/icon.js'
import {
  InputItem,
  Button
} from 'antd-mobile'
class Login extends Component {
  render(){
    return (
      <div className="register">
        <div className="register-header">欢迎登录</div>
        <div className="img-box">
          <img src={require('./image/head.jpg').default} alt="头像"  className="regitter-img" />
        </div>
        <div className="register-content">
          <div className="content-item">
            <InputItem className="register-mobile" placeholder="请输入手机号" maxLength={11} />
            <span className="mobile-icon">
              <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconshouji" />
            </span>
          </div>
          {/* <div className="content-item">
            <InputItem className="register-mobile" placeholder="请设置昵称" maxLength={32} />
            <span className="mobile-icon">
              <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconyonghu" />
            </span>
          </div> */}
          <div className="content-item">
            <InputItem className="register-mobile" placeholder="请输入密码" maxLength={6} />
            <span className="mobile-icon">
              <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconmima" />
            </span>
          </div>
        </div>
        <div className="login-btn">
          <Button className="register-button">登录</Button>
        </div>
      </div>
    )
  }
}
export default Shar(Login)

