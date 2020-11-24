/**
 * @abstract 首页
 * @author taoyawei
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Icon from '../../component/icon/icon.js'
import './index.scss'
class Home extends Component {
  constructor (props) {
    super(props)
    props.doClick()
    props.setHead()
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
  dogoCollection () {
    this.props.goCollection()
    this.props.history.push({pathname: '/collection'})
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
            <div className="btn" onClick={this.dogoCollection.bind(this)}>更多</div>
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
          <div className="hight-item">
            <div className="hight-item-left">
              <img src={require('./image/book_bg.jpg').default} alt="书" />
            </div>
            <div className="hight-item-right">
              <div className="item-right-title">流浪地球</div>
              <div className="item-right-author">作者：刘慈欣</div>
              <div className="item-right-number">
                <div className="number-collection">
                  <Icon type="iconshoucang" style={{width: '18px', height: '18px'}} />
                  <span>1.1万</span>
                </div>
                <div className="number-comment">
                  <Icon type="iconpinglun" style={{width: '18px', height: '18px'}} />
                  <span>1.1万</span>
                </div>
              </div>
            </div>
          </div>
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
    // 跳到主页面初始化路由栈
    doClick () {
      const action = {
        type: 'urlDelete',
        value: {}
      }
      dispatch(action)
    },
    // 跳到该页面初始化头部信息
    setHead () {
      const action = {
        type: 'heade',
        value: {
          title: '首页',
          color: '#ffffff',
          isgo: false
        }
      }
      dispatch(action)
    },
    // 跳转前将页面前将路由添加进store
    goCollection () {
      const action = {
        type: 'urlAdd',
        value: '/'
      }
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
