import React,{Component} from 'react';
import {Menu,Icon} from 'antd';


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
        <header className="left-header">
          <img src={logo} alt="logo"/>
          <h2>硅谷后台</h2>
        </header>

        <Menu theme="dark" mode="inline">
          {/*一级菜单*/}
          <Item>
            <Icon type="home" />
            <span>首页</span>
          </Item>
          {/*二级菜单*/}
          <SubMenu title={<span><Icon type="appstore" /><span>商品</span></span>}>
            <Item>
              <Icon type="bars" />
              <span>品类管理</span>
            </Item>
            <Item>
              <Icon type="tool" />
              <span>商品管理</span>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}