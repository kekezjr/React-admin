import React, {Component} from 'react';
import {Row,Col} from 'antd';


//引入文件
import './index.less';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Footer from '../../components/footer';


export default class Admin extends Component {
  render () {
    return (
      <Row className="admin-row">
        <Col span={4}>
          <LeftNav />
        </Col>
        <Col span={20}>
          <Header />
          <div className="admin-content">content</div>
          <Footer />
        </Col>
      </Row>
    )
  }
}