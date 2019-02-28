import React,{Component} from 'react';
import {Card,Button,Icon,Table} from 'antd';


export default class Category extends Component{




  render(){

    const columns = [{
      title: '品类名称',
      dataIndex: 'name',
      // render: text => {text},
    },{
      title: '操作',
      width: 400,
      render: xxx =>{
        return <div>
          <a href="JavaScript：void(0)">修改名称</a> &nbsp;&nbsp;
          <a href="JavaScript：void(0)">查看其子品类项</a>
        </div>
      }
    }];
    const data = [{
      key: '1',
      name: 'John Brown1',
    }, {
      key: '2',
      name: 'Jim Green1',
    }, {
      key: '3',
      name: 'Joe Black1',
    },{
      key: '4',
      name: 'John Brown2',
    }, {
      key: '5',
      name: 'Jim Green2',
    }, {
      key: '6',
      name: 'Joe Black2',
    },{
      key: '7',
      name: 'John Brown3',
    }, {
      key: '8',
      name: 'Jim Green3',
    }, {
      key: '9',
      name: 'Joe Black3',
    }
    ];


    return(
      <div>
        <Card
          title="一级分类列表"
          extra={<Button type='primary'><Icon type="plus" />添加品类</Button>}
        >

          <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={{pageSize:3,
              showSizeChanger:true,
              pageSizeOptions:['3','6','9','12'],
              showQuickJumper:true,
            }}
          />


        </Card>
      </div>
    )
  }
}