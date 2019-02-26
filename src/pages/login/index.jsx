import React, {Component} from 'react';



//引入的图片
import logo from './logo.png';
//引入文件
import './index.less';
import LoginForm from '../../components/login-form/index'


export default class Login extends Component {

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-form">
          <h2>用户登录</h2>
          <LoginForm />
        </section>
      </div>
    )
  }
}
