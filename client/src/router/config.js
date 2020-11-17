/**
 * @abstract 路由配置文件
 * @author taoyawei
 */
import Home from '../view/home/index.jsx'
import Login from '../view/user/login.jsx' // 登陆
import Register from '../view/user/register.jsx' // 注册
import Modify from '../view/user/modify.jsx' // 修改密码
const config = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/modify',
    name: 'Modify',
    component: Modify
  }
]
export default config
