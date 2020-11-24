/**
 * @abstract 我收藏的图书
 * @author taoyawei
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'

class Collection extends Component {
  constructor(props) {
    super(props)
    props.setHead()
    this.state = {
      list: [
        {
          book_name: '流浪地球',
          author: '刘慈欣',
          id: 0
        },
        {
          book_name: '大西厢',
          author: '郭德纲',
          id: 1
        },
        {
          book_name: '疯子在左，天才在右',
          author: '哈哈哈',
          id: 2
        },
        {
          book_name: '菜根谭',
          author: '哈哈哈',
          id: 3
        },
        {
          book_name: '大学',
          author: '哈哈哈',
          id: 4
        },
        {
          book_name: '中庸',
          author: '哈哈哈',
          id: 5
        }
      ]
    }
  }
  goDetail () {
    this.props.goToDetail()
    this.props.history.push({pathname: '/detail'})
  }
  render() {
    return (
      <div className="collection-box">
        {/* <div className="box-item"></div> */}
        {
          this.state.list.map((item, index) => {
            return(
              <div className="box-item" key={index} onClick={this.goDetail.bind(this)}>
                <img src={require('./image/book.png').default} alt="book" className="item-img" />
                <div className="item-name">{item.book_name}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    info: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 跳到该页面初始化头部信息
    setHead () {
      const action = {
        type: 'heade',
        value: {
          title: '收藏',
          color: '#ffffff',
          isgo: true
        }
      }
      dispatch(action)
    },
    // 跳转详情页添加本页路由至栈中
    goToDetail () {
      const action = {
        type: 'urlAdd',
        value: '/collection'
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection)