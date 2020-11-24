/**
 * @abstract 底部模块
 * @author taoyawei
 */
import React, {Component} from 'react'
import { TabBar } from 'antd-mobile'
import Icon from '../icon/icon.js'
import {connect} from 'react-redux'
// import { withRouter } from 'react-router-dom'
import './tabar.scss'
class Tabar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'home',
      hidden: false,
      fullScreen: false,
    }
  }
  // 点击各个菜单
  doMenu (msg) {
    const action = {
      type: 'urlDelete',
      value: {}
    }
    switch(msg) {
      case 'home':
        this.setState({
          selectedTab: 'home'
        })
        action.value = {
          path: '/',
          title: '首页',
          color: '#ffffff',
          isgo: false
        }
        this.props.changeStore(action)
        this.props.history.push({pathname: '/'})
        break
      case 'circle':
        this.setState({
          selectedTab: 'circle'
        })
        action.value = {
          path: '/circle',
          title: '圈子',
          color: 'red',
          isgo: false
        }
        this.props.changeStore(action)
        this.props.history.push({pathname: '/circle'})
        break
      case 'list':
        this.setState({
          selectedTab: 'list'
        })
        action.value = {
          path: '/list',
          title: '榜单',
          color: 'black',
          isgo: false
        }
        this.props.changeStore(action)
        this.props.history.push({pathname: '/list'})
        break
      case 'my':
        this.setState({
          selectedTab: 'my'
        })
        action.value = {
          path: '/my',
          title: '我的',
          color: 'blue',
          isgo: true
        }
        this.props.changeStore(action)
        this.props.history.push({pathname: '/my'})
        break
      default:
        this.setState({
          selectedTab: 'home'
        })
        action.value = {
          path: '/',
          title: '首页',
          color: '#ffffff'
        }
        this.props.changeStore(action)
        this.props.history.push({pathname: '/'})
        break
    }
  }
  render () {
    return (
      <div className="tabar">
        <div className="tabar-box">
          <TabBar
            className="tabar-box"
            unselectedTintColor="#666666" // 未选中字体
            tintColor="#f5d147" // 选中字体
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="home"
              // 未选中图标
              icon={
                <Icon
                  type="iconshouye"
                  style={{width: '25px', height: '25px', color: '#666666'}}
                />
              }
              // 选中图标
              selectedIcon={
                <Icon
                  type="iconshouye"
                  style={{width: '25px', height: '25px', color:'#f5d147'}}
                />
              }
              selected={this.state.selectedTab === 'home'} // 是否选中
              // badge={1} // 数字
              onPress={this.doMenu.bind(this, 'home')}
              data-seed="logId"
            >
              {/* {this.renderContent('Life')} */}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <Icon
                  type="iconquanzi"
                  style={{width: '25px', height: '25px', color: '#666666'}}
                />
              }
              selectedIcon={
                <Icon
                  type="iconquanzi"
                  style={{width: '25px', height: '25px', color: '#f5d147'}}
                />
              }
              title="圈子"
              key="circle"
              // badge={'new'}
              selected={this.state.selectedTab === 'circle'}
              onPress={this.doMenu.bind(this, 'circle')}
              data-seed="logId1"
            >
              {/* {this.renderContent('Koubei')} */}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <Icon
                  type="iconzhaoshangxiaochengxu-kanbangdan"
                  style={{width: '25px', height: '25px', color: '#666666'}}
                />
              }
              selectedIcon={
                <Icon
                  type="iconzhaoshangxiaochengxu-kanbangdan"
                  style={{width: '25px', height: '25px', color: '#f5d147'}}
                />
              }
              title="榜单"
              key="list"
              // dot
              selected={this.state.selectedTab === 'list'}
              onPress={this.doMenu.bind(this, 'list')}
            >
              {/* {this.renderContent('Friend')} */}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <Icon
                  type="iconme"
                  style={{width: '25px', height: '25px', color: '#666666'}}
                />
              }
              selectedIcon={
                <Icon
                  type="iconme"
                  style={{width: '25px', height: '25px', color: '#f5d147'}}
                />
              }
              title="我的"
              key="my"
              selected={this.state.selectedTab === 'my'}
              onPress={this.doMenu.bind(this, 'my')}
            >
              {/* {this.renderContent('My')} */}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeStore (action) {
      dispatch(action)
    }
  }
}
// connect(mapStateToProps, mapDispatchToProps)(
export default connect(mapStateToProps, mapDispatchToProps)(Tabar)
