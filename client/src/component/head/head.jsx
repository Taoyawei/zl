/**
 * @abstract APP头部
 * @author taoyawei
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Icon from '../icon/icon.js'
import './head.scss'

class Head extends Component {
  doGo () {
    if (this.props.urlArr.length > 0) {
      const path = this.props.urlArr[0]
      this.props.history.push({pathname: path})
      this.props.doDelete()
    }
  }
  render(){
    return (
      <div className="head">
        <div className="head-box" style={{background: this.props.info.color}}>
          <div className="header-left" onClick={this.doGo.bind(this)}>
            {
              this.props.info.isgo ?
               <Icon type="iconlujing39" style={{width: '20px', height: '35px', color: '#333333'}} /> :
               <span></span>
            }
          </div>
          <div className="header-center">{this.props.info.title}</div>
          <div className="header-right"></div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return {
    info: state.headInfo,
    urlArr: state.urlInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    doDelete () {
      const action = {
        type: 'urlReduce',
        value: {}
      }
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Head)
