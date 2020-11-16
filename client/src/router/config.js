/**
 * @abstract 路由配置文件
 * @author taoyawei
 */
import Home from '../view/home/index.jsx'
import Login from '../view/user/login.jsx'
import Register from '../view/user/register.jsx'
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
  }
]
export default config
