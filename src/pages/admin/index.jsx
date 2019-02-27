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
              <Redirect to='/home'/>
            </Switch>
          </div>
          <Footer />
        </Col>
      </Row>
    )
  }
}