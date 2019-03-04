import React,{Component} from 'react';

import {Switch,Redirect,Route} from 'react-router-dom';

//引入文件
import Index from './index';
import Detail from './detail';
import SaveUpdata from './saveupdate';


export default class Product extends Component{
  render(){
    return(

      <Switch>
        <Route path='/product/index' component={Index}/>
        <Route path='/product/detail' component={Detail}/>
        <Route path='/product/saveupdate' component={SaveUpdata}/>
        <Redirect to='/product/index'/>
      </Switch>
    )
  }
}