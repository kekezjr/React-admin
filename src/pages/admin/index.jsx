import React, {Component} from 'react';
import {Row,Col} from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom'


//引入文件
import './index.less';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';


export default class Admin extends Component {
  render () {
    return (
      <Row className="admin-row">
        <Col span={4}>
          <LeftNav />
        </Col>
        <Col span={20}>
          <Header />
          <div className="admin-content">
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </div>
          <Footer />
        </Col>
      </Row>
    )
  }
}