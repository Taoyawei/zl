/**
 * @abstract 修改密码模块
 * @author taoyawei
 */
import React, { Component } from 'react'
import Shar from './shar.jsx'
import './scss/modify.scss'
import Icon from '../component/icon/icon.js'
import {
  List,
  InputItem,
  Button
} from 'antd-mobile'
class Modify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: null,
      password: null,
      newPassword: null
    }
  }
  doGetInfo (msg, e) {
    switch(msg) {
      case 'mobile':
        this.setState({
          mobile: e
        })
        break
      case 'password':
        this.setState({
          mobile: e
        })
        break
      case 'newPassword':
        this.setState({
          newPassword: e
        })
        break
      default:
        console.log('错了')
    }
  }
  render(){
    return (
      <div className="register">
        <div className="register-header">修改密码</div>
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
                  onChange={this.doGetInfo.bind(this, 'mobile')}
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
                  value={this.state.password}
                  placeholder="老密码"
                  maxLength={32}
                  type="password"
                  onChange={this.doGetInfo.bind(this, 'password')}
                />
                <span className="mobile-icon">
                  <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconyonghu" />
                </span>
              </div>
            </List.Item>
            <List.Item>
              <div className="content-items">
                <InputItem
                  clear
                  className="register-mobile"
                  value={this.state.newPassword}
                  placeholder="请设置新密码"
                  maxLength={6}
                  type="password"
                  onChange={this.doGetInfo.bind(this, 'newPassword')}
                />
                <span className="mobile-icon">
                  <Icon style={{width: '20px', height: '20px', color: '#ffffff'}} type="iconmima" />
                </span>
              </div>
            </List.Item>
          </List>
        </div>
        <div className="modify-btn">
          <Button className="register-button">修改密码</Button>
        </div>
      </div>
    )
  }
}
export default Shar(Modify)

