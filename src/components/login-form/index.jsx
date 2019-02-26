import React,{Component} from 'react';

import {Form, Icon, Input, Button,message} from 'antd';
const Item = Form.Item;


class LoginForm extends Component{

  //自定义校验（用if语句判断）
  handlePassWord = (rule,value,callback) =>{
    if(!value){
      callback('请输入密码');
    }else if(value.length <6){
      callback('密码不能低于6位数');
    }else if(value.length>30){
      callback('密码不能高于30位数');
    }else if(!/^[a-zA-Z0-9_]+$/){
      callback('密码必须为大小写字母，数字或下划线');
    }else{
      callback();
    }
  }


  handleSubmit = e =>{

    const {validateFields,resetFields} = this.props.form;
    e.preventDefault();
  //  检查当前表单是否通过校验
    validateFields((error, values) => {
      if (!error) {
        //
        console.log('Received values of form: ', values);
      }else{

      //resetFields 重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
      // Function([names: string[]])
        resetFields(['password']);

      //  提示错误信息

        const e = Object.values(error);
        console.log(e);   //errors为一个数组
        // const errMsg = Object.values(error).reduce((prev, curr) => prev + curr.errors[0].message + ' ', '')
        //提示错误
       // message.error(errMsg);
      }
    });
  }


  render(){
    const {getFieldDecorator,getFieldValue} = this.props.form;
    //当前输入框得到的值
    // console.log(getFieldValue('username'));
    //getFieldDecorator（输入框的标识名称，配置对象）
    //validator 自定义校验（注意，callback 必须被调用） function(rule, value, callback)
    return(
      <Form className="content-form" onSubmit={this.handleSubmit}>
        <Item>
          {
            getFieldDecorator(
              'username',
              {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  { min: 4, message: '用户名输入不能少于4位'},
                  { max: 20, message: '用户名输入不能多于20位'},
                  { pattern: /^[a-zA-Z0-9_]+$/,message: '用户名必须是大小写字母，数字或下划线'}
                ]
              }
            )(<Input prefix={<Icon type="user" />} placeholder="Username" />)
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'password',
              {
                rules: [
                  // { required: true, message: '请输入你的密码!' },
                  // { min: 6, message: '密码不能低于6位数'},
                  // {max: 20, message: '密码不能高于20位数'},
                  // {pattern: /^[a-zA-Z0-9_]+$/, message:'密码必须为大小写字母，数字或下划线'}
                  {validator: this.handlePassWord}
                ]
              }

            )(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)
          }

        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        </Item>
      </Form>
    )
  }
}
/*
* 包裹了LoginForm组件
*
* */
const AddLoginForm = Form.create()(LoginForm);
//暴露组件
export default AddLoginForm;