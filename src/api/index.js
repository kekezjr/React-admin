/**
 * Created by Administrator on 2019/2/27 0027.
 */

import ajax from "./ajax";

//提取公共地址
//webpack定义的环境变量
//process.env.NODE_ENV  // development  production
const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';

//发送请求

// function reqLogin(username,password){
//   return axios('http://localhost:5000/login',{username,password},'POST');
// }

//请求用户登录
export const reqLogin = (username,password) => ajax(prefix + '/login',{username,password},'POST');

//请求添加用户
export const AddUser = user =>ajax(prefix + '/manage/user/add',user,'POST');