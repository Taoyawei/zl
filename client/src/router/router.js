/**
 * @abstract 路由文件
 * @author taoyawei
 */
import React, { Component } from 'react'
import {
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom'
import Head from '../component/head/head.jsx'
import Tabar from '../component/tabar/tabar.js'
import config from './config.js'

class Router extends Component {
  render () {
    return(
      <BrowserRouter>
        <Route name="Head" component={Head} />
        <Switch>
          {
            config.map((item, index) => {
              return(
                <Route
                  exact
                  key={index}
                  name={item.name}
                  path={item.path}
                  component={item.component}
                />
              )
            })
          }
        </Switch>
        <Route name="Tabar" component={Tabar} />
      </BrowserRouter>
    )
  }
}

export default Router
