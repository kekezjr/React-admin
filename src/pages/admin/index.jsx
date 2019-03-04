import React, {Component} from 'react';
import {Layout} from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom'

//引入文件
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../home';
import Category from '../category';
import Product from '../product/product';
import User from '../user';
import Role from '../role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
// import {getItem} from '../../utils/storageUtils'
import MemoryUtils from '../../utils/memoryUtils';

const {Sider, Content} = Layout;

export default class Admin extends Component {

  render () {
    //保证首次渲染和重新渲染都做登录验证
    // const user = getItem();
    const user = MemoryUtils.user;
    if(!user || !user._id){
     return <Redirect to='/login' />
    }

    return (
      <Layout>
        <Sider style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}>
          <LeftNav />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header />
          <Content style={{margin: 20}}>
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
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}