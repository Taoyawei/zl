/**
 * @abstract 首页
 * @author taoyawei
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
    props.doClick()
  }
  render () {
    return (
      <div className="home">
        我是首页
        <div className="home-footer">我是底部</div>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    doClick () {
      const action = {
        type: 'urlAdd',
        value: {
          url: '/',
          title: '首页',
          color: '#ffffff',
          isgo: false
        }
      }
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
