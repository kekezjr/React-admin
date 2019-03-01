import React,{Component} from 'react';
import {Card,Button,Icon,Table,message} from 'antd';

//引入文件
import {reqCategory} from '../../api';


export default class Category extends Component{

  state = {
    categories: []
  }

  //获取Category列表
  getCategories = async parentId =>{
  //  发送请求
    const result = await reqCategory(parentId)

    if(result.status === 0){
    //  获取列表成功
      this.setState({
        // categories(result.data);
        categories : result.data
      })

    }else{
      message.error('列表请求失败')
    }
  }


  componentDidMount(){
    this.getCategories('0');
  }




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

    // const data = [{
    //   "parentId": "0",
    //   "_id": "5c2ed631f352726338607046",
    //   "name": "分类001",
    //   "__v": 0
    // },
    //   {
    //     "parentId": "0",
    //     "_id": "5c2ed647f352726338607047",
    //     "name": "分类2",
    //     "__v": 0
    //   },
    //   {
    //     "parentId": "0",
    //     "_id": "5c2ed64cf352726338607048",
    //     "name": "1分类3",
    //     "__v": 0
    //   }
    // ];
    const {categories} = this.state;


    return(
      <div>
        <Card
          title="一级分类列表"
          extra={<Button type='primary'><Icon type="plus" />添加品类</Button>}
        >

          <Table
            columns={columns}
            dataSource={categories}
            bordered
            pagination={{pageSize:9,
              showSizeChanger:true,
              pageSizeOptions:['3','6','9','12'],
              // showQuickJumper:true,
            }}
            rowKey='_id'

          />

        </Card>
      </div>
    )
  }
}