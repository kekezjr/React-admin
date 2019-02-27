import React,{Component} from 'react';
import {Menu,Icon} from 'antd';

import {NavLink} from 'react-router-dom';


//引入文件+图片
import logo from '../../assets/images/logo.png';
import './index.less';


//定义
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

export default class LeftNav extends Component{
  render(){
    return(
      <div className="left-nav">
        <header>
          <NavLink to='/home' className="left-header">
            <img src={logo} alt="logo"/>
            <h2>硅谷后台</h2>
          </NavLink>
        </header>

        <Menu theme="dark" mode="inline">
          {/*一级菜单*/}
          <Item>
            <NavLink to='/home'>
              <Icon type="home" />
              <span>首页</span>
            </NavLink>
          </Item>

          {/*二级菜单*/}
          <SubMenu title={<span><Icon type="appstore" /><span>商品</span></span>}>
            <Item>
              <NavLink to='/category'>
                <Icon type="bars" />
                <span>品类管理</span>
              </NavLink>
            </Item>
            <Item>
              <NavLink to='/product'>
                <Icon type="tool" />
                <span>商品管理</span>
              </NavLink>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}