/**
 * Created by Administrator on 2019/2/26 0026.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//引入文件
import {getItem} from './utils/storageUtils';
import MemoryUtils from './utils/memoryUtils';

//将localhost的值读取出来，保存在内存中
const user = getItem();
if(user && user._id){
  MemoryUtils.user = user;
}



ReactDOM.render(<App />,document.getElementById('root'));