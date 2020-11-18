/**
 * @abstract APP头部
 * @author taoyawei
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Icon from '../icon/icon.js'
import './head.scss'

class Head extends Component {
  render(){
    return (
      <div className="head">
        <div className="head-box" style={{background: this.props.info.color}}>
          <div className="header-left">
            <Icon type="iconlujing39" style={{width: '20px', height: '35px', color: '#333333'}} />
          </div>
          <div className="header-center">首页</div>
          <div className="header-right"></div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return {
    info: state.urlInfo.length > 0 ? state.urlInfo[0] : {path: '/', title: '首页', color: '#ffffff'}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // 方法
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Head)
