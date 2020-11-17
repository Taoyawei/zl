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
                  placeholder="老密码"
                  maxLength={32}
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
                  placeholder="请设置新密码"
                  maxLength={6}
                  type="password"
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

