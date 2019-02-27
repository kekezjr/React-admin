/**
 * Created by Administrator on 2019/2/27 0027.
 */

import axios from 'axios';
import {message} from 'antd';

/*
  封装ajax请求函数   返回值是一个promise对象
  要求：
     1.统一处理成功或失败
     2.返回的是promise对象，里面直接是请求回来的数据
*/
export default function ajax(url,data={},method='GET'){
  //执行异步ajax请求
  let promise = null;
  if(method === 'GET'){
    promise = axios.get(url,{params:data});
  }else if(method === 'POST'){
    promise = axios.post(url,data);
  }

  return new Promise((resolve,reject) =>{
    promise
      .then(res =>{
        //将请求的数据返回
        resolve(res.data)
      })
      .catch(err =>{
        //请求失败
        console.log('请求失败:',err)
        message.error('请求失败')
      })
  })

}

