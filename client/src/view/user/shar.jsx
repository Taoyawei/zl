/**
 * @abstract 登录，注册， 修改密码公共的页面，使用hoc
 * @author taoyawei
 */
import React, {Component} from 'react'
import './scss/shar.scss'
function Shar (WarppedComponent) {
  return class NewShar extends Component {
    // constructor(props) {
    //   super(props)
    // }
    render () {
      return (<div className="box">
        {/* <div className="box-shard"></div> */}
        <WarppedComponent {...this.props} />
      </div>)
    }
  }
}
export default Shar
