/**
 * @abstract 路由配置文件
 * @author taoyawei
 */
import Home from '../view/home/index.jsx'
import Login from '../view/user/login.jsx' // 登陆
import Register from '../view/user/register.jsx' // 注册
import Modify from '../view/user/modify.jsx' // 修改密码
import Circle from '../view/circle/index.jsx' // 圈子
import List from '../view/list/index.jsx' // 榜单
import My from '../view/my/index.jsx' // 我的
const config = [
  {
    path: '/',
    name: 'Home',
    title: '首页',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    title: '登录',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    title: '注册',
    component: Register
  },
  {
    path: '/modify',
    name: 'Modify',
    title: '修改密码',
    component: Modify
  },
  {
    path: '/circle',
    name: 'Circle',
    title: '圈子',
    component: Circle
  },
  {
    path: '/list',
    name: 'List',
    title: '榜单',
    component: List
  },
  {
    path: '/my',
    name: 'My',
    title: '我的',
    component: My
  }
]
export default config
