import React, {Component} from 'react';

//引入的图片
import logo from '../../assets/images/logo.png';
//引入文件
import './index.less';
import LoginForm from '../../components/login-form/index';
import {reqLogin} from '../../api';
import {setItem} from '../../utils/storageUtils';
import MemoryUtils from '../../utils/memoryUtils';


export default class Login extends Component {

  state = {
    errMsg:''
  }

  //登陆的方法
  login = async(username, password) =>{


    const result = await reqLogin(username,password)
    // console.log(result);

    if(result.status === 0){
      //用户登录成功 保存用户信息
      setItem(result.data);

      //在内存中储存一份
      MemoryUtils.user = result.data;


      //  跳转到admin页面
      this.props.history.replace('/');

    }else{
      //  用户登录失败 提示错误的信息
      this.setState({
        errMsg:result.msg
      })

    }
  }

  render() {
    const {errMsg} = this.state;
    const height = errMsg ? 30 : 0;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-form">
          <div className="err-msg" style={{height}}>{errMsg}</div>
          <h2>用户登录</h2>
          <LoginForm login={this.login}/>
        </section>
      </div>
    )
  }
}
