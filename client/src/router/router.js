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
import config from './config.js'

class Router extends Component {
  render () {
    return(
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

export default Router
