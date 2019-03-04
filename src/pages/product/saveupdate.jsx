import React,{Component} from 'react';
import {Input,Card,Form ,Cascader,Button,InputNumber,Icon} from 'antd';

//引入文件
import './index.less';

//自定义
const Item = Form.Item;

class SaveUpdate extends Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake',
          }],
        }],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          }],
        }],
      }
    ];

    //获取传入的数据
    // const {state} = this.props.locations;
    // const product = state ? state.product : false;

    return (
      <Card
        title={
          <div className="updata-title">
            <Icon type="arrow-left" style={{fontSize:30}} onClick={() =>this.props.history.goBack()}/>
            <span>添加商品</span>
          </div>
        }

      >
        <Form >
          <Item label="商品名称" {...formItemLayout}>

            <Input placeholder="请输入商品名称" style={{width:600}}/>
          </Item>
          <Item label="商品描述" {...formItemLayout}>
            <Input placeholder="请输入商品描述" style={{width:600}}/>
          </Item>
          <Item label='选择分类' {...formItemLayout}>
            <Cascader placeholder='请选择分类' options={options} style={{width:300}}/>
          </Item>
          <Item label='商品价格' {...formItemLayout}>
            <InputNumber
              style={{width: 120}}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\D+/g, '')}
            />
          </Item>
          <Item label='商品图片' {...formItemLayout}>
            xxx
          </Item>
          <Item label='商品详情' labelCol = {{span:2}} wrapperCol={{span:15}}>
            xxx
          </Item>
          <Item wrapperCol={{span:15}}>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>

        </Form>
      </Card>
    )
  }
}

export default Form.create()(SaveUpdate)