/**
 * Created by Administrator on 2019/2/28 0028.
 */

//用来封装储存的方法
import store from 'store';


//保存数据
export const setItem = value =>{
  //判断数据存在并且数据不能为函数
  if(value && typeof value!== 'function'){
    store.set('user',value)
  }else{
    console.log('保存失败')
  }
}


//读取数据
export const getItem = () =>{
  const value = store.get('user');
  return value || '';
}

//删除数据
export const removeItem = () =>{
  store.remove('user')
}
