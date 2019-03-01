import React from 'react';

//引入样式文件
import './index.less'

export default function MyButton(props) {
  return <button {...props} className='my-button'>{props.name}</button>
}