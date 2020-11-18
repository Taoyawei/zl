/**
 * @abstract 首页
 * @author taoyawei
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
class Home extends Component {
  constructor (props) {
    super(props)
    props.doClick()
  }
  render () {
    return (
      <div>
        我是首页
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
          color: '#ffffff'
        }
      }
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
