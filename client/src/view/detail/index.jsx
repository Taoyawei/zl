/**
 * @abstract 书本详情
 * @author taoyawei
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'

class Detail extends Component {
  constructor(props) {
    super(props)
    props.setHead()
  }
  render() {
    return (
      <div>
        detail
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.urlInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // 跳到该页面初始化头部信息
    setHead () {
      const action = {
        type: 'heade',
        value: {
          title: '详情',
          color: '#ffffff',
          isgo: true
        }
      }
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
