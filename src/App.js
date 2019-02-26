/**
 * Created by Administrator on 2019/2/26 0026.
 */

import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


//引入文件
import Login from './pages/login';
import Admin from './pages/admin';

import './assets/less/index.less';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </Router>
    )
  }
}