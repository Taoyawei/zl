/**
 * @abstract 首页
 * @author taoyawei
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Icon from '../component/icon/icon.js'
import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
    props.doClick()
    this.state = {
      collections: [
        {
          title: '水浒',
          author: '施耐庵'
        },
        {
          title: '西游记',
          author: '吴承恩'
        },
        {
          title: '菜根谭',
          author: '洪应'
        },
        {
          title: '红楼梦',
          author: '曹雪芹'
        }
      ]
    }
  }
  render () {
    return (
      <div className="home">
        <div className="home-header">
          <input type="text" className="header-input" />
          <span className="header-icon">
            <Icon type="iconsousuo" style={{width: '100%', color: '#adb3bd'}} />
          </span>
        </div>
        <div className="header-bg"></div>
        <div className="home-collection">
          <div className="home-collection-title">
            <div className="title">我的收藏</div>
            <div className="btn">更多</div>
          </div>
          <div className="home-collection-content">
            {
              this.state.collections.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="item-book">
                      {/* <div className="item-book-title">{item.title}</div>
                      <div className="item-book-author">—{item.author}</div> */}
                    </div>
                    <div className="item-name">{item.title}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div style={{width: '100%', height: '30px', background: '#f9f9f9'}}></div>
        <div className="higt-book">
          <div className="hight-header">优秀图书推荐</div>
        </div>
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
