import React,{Component} from 'react';
import {Row,Col,Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';
import jsonp from 'jsonp';

//引入的文件
import './index.less';
import MemoryUtils from '../../utils/memoryUtils';
import {removeItem} from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import {Weather} from '../../api/index';
//自定义
const confirm = Modal.confirm;

class Header extends Component{

  state = {
    timer: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather: '晴'

  }

  componentDidMount(){
    this.upDate();
    this.getWeather();
  }


  //获取时间
  upDate = () =>{
    this.timerInterval = setInterval(()=>{
      this.setState({
        timer:dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },1000)
  }
  //获取天气
  getWeather = () =>{
    Weather('北京')
      .then((res) =>{

        this.setState({
          dayPictureUrl : res.dayPictureUrl,
          weather : res.weather,
        })

      })
      .catch((err) =>{
      message.error('请求天气失败')

      })
  }


  //清除定时器
  componentWillMount(){
    clearInterval(this.timerInterval);
  }


  //退出登录
  logOut = () =>{
    confirm({
      title: '您确定要退出登录吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        console.log(this);
        //确定时要跳转到登录页面（login）
        this.props.history.replace('/login');
      //  清除用户信息和内存中的信息
        removeItem();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //获取标题
  // getTitle = () =>{
  // //
  //   const {pathname} = this.props.location;
  //   for(let i = 0;i<menuList.length;i++){
  //     let item = menuList[i];
  //     if(item.children){
  //       for(let j=0;j<item.children.length;j++){
  //         let gItem = item.children[j];
  //         if(gItem.key === pathname){
  //           return gItem.title;
  //         }
  //       }
  //     }else{
  //       //如果没有二级菜单，返回title
  //       if(item.key === pathname){
  //         return item.title;
  //       }
  //     }
  //   }
  // }

  //
  //获取标题
  getTitle = menu =>{

    const {pathname} = this.props.location;
    for(let i = 0;i<menu.length;i++){
      let item = menu[i];
      if(item.children){
        // for(let j=0;j<item.children.length;j++){
        //   let gItem = item.children[j];
        //   if(gItem.key === pathname){
        //     return gItem.title;
        //   }
        // }

        //递归寻找是否有title，有值就return出去
        const title = this.getTitle(item.children);
        if(title){
          return title;
        }
      }else{
        //如果没有二级菜单，返回title
        if(item.key === pathname){
          return item.title;
        }
      }
    }
  }

  render(){

    //获取用户信息
    const {username} = MemoryUtils.user;
    //获取title信息
    const title = this.getTitle(menuList);
    //获取时间,天气
    const {timer,dayPictureUrl,weather} = this.state;

    return(
      <div className="header">
        <Row className="header-top">
          <span>欢迎，{username}</span>
          <a href="javascript:void(0)" onClick={this.logOut}>退出</a>
        </Row>
        <Row className="header-bottom">
          <Col span={6} className="header-bottom-left">{title}</Col>
          <Col span={18} className="header-bottom-right">
            <span >{timer}</span>
            <img src={dayPictureUrl} alt=""/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
//暴露出去
export default withRouter(Header);