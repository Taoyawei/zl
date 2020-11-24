/**
 * @abstract 注册页面
 * @author taoyawei
 */
import React, { Component } from 'react'
import Shar from './shar.jsx'
import './scss/register.scss'
import Icon from '../../component/icon/icon.js'
import {
  List,
  InputItem,
  Button
} from 'antd-mobile'
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: null,
      nickName: null,
      password: null
    }
    // this.doSetData = this.doSetData.bind(this)
  }
  doSetData(msg, e) {
    switch(msg) {
      case 'mobile':
        this.setState({
          mobile: e
        })
        break
      case 'nickName':
        this.setState({
          nickName: e
        })
        break
      case 'password':
        this.setState({
          password: e
        })
        break
      default:
        console.log('错了')
        break
    }
  }
  doRegister () {
    console.log(this.state.mobile)
    console.log(this.state.nickName)
    console.log(this.state.password)
  }
  render(){
    return (
      <div className="register">
        <div className="register-header">欢迎注册</div>
        <div className="img-box">
          <img src={require('./image/head.jpg').default} alt="头像"  className="regitter-img" />
        </div>
        <div className="register-content">
          <List>
            <List.Item>
              <div className="content-item">
                <InputItem
                  clear
                  type="number"
                  className="register-mobile"
                  value={this.state.mobile}
                  placeholder="请输入手机号"
                  maxLength={11}
                  onChange={this.doSetData.bind(this, 'mobile')}
                  />
                <span className="mobile-icon">
                  <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconshouji" />
                </span>
              </div>
            </List.Item>
            <List.Item>
              <div className="content-item">
                <InputItem
                  clear
                  className="register-mobile"
                  value={this.state.nickName}
                  placeholder="请设置昵称"
                  maxLength={32}
                  onChange={this.doSetData.bind(this, 'nickName')}
                />
                <span className="mobile-icon">
                  <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconyonghu" />
                </span>
              </div>
            </List.Item>
            <List.Item>
              <div className="content-item">
                <InputItem
                  clear
                  className="register-mobile"
                  value={this.state.password}
                  placeholder="请设置密码"
                  maxLength={6}
                  type="password"
                  onChange={this.doSetData.bind(this, 'password')}
                />
                <span className="mobile-icon">
                  <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconmima" />
                </span>
              </div>
            </List.Item>
          </List>
        </div>
        <div className="register-btn">
          <Button className="register-button" onClick={this.doRegister.bind(this)}>注册</Button>
        </div>
      </div>
    )
  }
}
export default Shar(Register)
