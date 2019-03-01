/**
 * Created by Administrator on 2019/2/27 0027.
 */
import jsonp from 'jsonp';
//引入文件
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

//请求天气信息的函数
export const Weather = city =>{
  return new Promise((resolve,reject) =>{
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,

      {},
      (err,data) =>{
        if(!err){
          //  请求成功
          resolve(data.results[0].weather_data[0])

        }else{
          //  请求失败
          reject('天气请求失败 ')
        }
      }
    )
  })
};

//请求category数据
export const reqCategory = parentId => ajax(prefix + '/manage/category/list',{parentId});

//获取添加分类数据
export const reqAddCategory = (parentId,categoryName)=> ajax(prefix + '/manage/category/add',{parentId,categoryName},'POST');

//更新更新品类名称
export const reqUpDataCategoryName = (categoryId,categoryName) =>ajax(prefix + '/manage/category/update',{categoryId,categoryName},'POST');
