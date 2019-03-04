import React,{Component} from 'react';
import {Menu,Icon} from 'antd';

import {NavLink,withRouter} from 'react-router-dom';


//引入文件+图片
import logo from '../../assets/images/logo.png';
import './index.less';
import menuList from '../../config/menuConfig';


//定义
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class LeftNav extends Component{

  componentWillMount(){
    this.menu = this.createMenu(menuList);
    // console.log(menu);
  }

  createMenu = (menu) =>{
    return menu.map(item =>{
      //判断是否有子菜单
      if(item.children){
        //得到当前路径
        const {pathname} = this.props.location;
        const result = item.children.find(item => pathname.indexOf(item.key) === 0);
        if(result){
          this.open = item.key;
        }

        return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
          {
            this.createMenu(item.children)
          }
        </SubMenu>
      }else{
        //一级菜单
        return <Item key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </NavLink>
        </Item>
      }

    })
  }

  render(){
    let {pathname} = this.props.location;

    if(/^\/product/.test(pathname)){
      pathname = '/product';
    }

    return(
      <div className="left-nav">
        <header>
          <NavLink to='/home' className="left-header">
            <img src={logo} alt="logo"/>
            <h2>硅谷后台</h2>
          </NavLink>
        </header>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.open]}
        >
          {
           this.menu
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav);

