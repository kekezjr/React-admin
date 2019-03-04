import React,{Component} from 'react';
import {Card,Select,Input,Button,Icon,Table,message} from 'antd'


//引入文件
import MyButton from '../../components/my-button';
import {reqProductsList,reqSearchProductsList} from '../../api'
const { Option } = Select;


//引入文件

export default class Index extends Component{
  state = {
    products:[],
    total: 0,
    searchType:'productName',
    searchName:'',
  }

  componentWillMount() {
    this.columns = [{
      title: '商品名称',
      dataIndex: 'name',
      // render: text => {text},
    }, {
      title: '商品描述',
      dataIndex: 'desc',
    },{
      title: '价格',
      dataIndex: 'price',
      render:text => '¥' + text,
    },{
      title: '状态',
      width:200,
      dataIndex: '',
      render: category => {
        return <div>
          <Button type='primary'>上架</Button>&nbsp;&nbsp;
          已下架
        </div>
      }
    },{
      title: '操作',
      width:200,
      dataIndex: '',
      render: product => {
        return <div>
          <MyButton name="详情" onClick={() => {}}/> &nbsp;&nbsp;
          {/*push(path, [state]) 第一个是path，第二个是一个可选值（可以传一个状态）*/}
          <MyButton name="修改" onClick={() => this.props.history.push('/product/saveupdate',{product})}/>
        </div>
      }
    }
    ];
  }


  //获取分页列表数据和搜索商品列表
  getProducts = async(pageNum,pageSize) =>{

    const {searchName,searchType} = this.state;
    let result;

    if(searchName){
      result = await reqSearchProductsList({searchName, searchType, pageNum, pageSize})
    }else{
      result = await reqProductsList(pageNum,pageSize);
    }

    if(result.status === 0){
      // message.success('获取商品列表成功');
      this.setState({
        products: result.data.list,
        total:result.data.total,
      })

    }else{
      message.error('获取商品列表失败');
    }
  }

  //
  componentDidMount(){
    this.getProducts(1,2);
  }

  //搜索产品
  // search = (pageNum, pageSize) =>{
  // //  获取表单的值
  //
  //   if(result.state === 0){
  //
  //   }else{
  //
  //   }
  //
  // }
  handleChange = (name,value) =>{
    this.setState({
      [name]:value
    })
  }

  render(){
    const {products,total} = this.state;
    // const data = [
    //   {
    //     "status": 1,
    //     "imgs": [],
    //     "_id": "5c7b7b2d8394492a54595028",
    //     "name": "啊啊啊",
    //     "desc": "不不不",
    //     "price": 200,
    //     "detail": "<p>很好</p>\n",
    //     "categoryId": "未选择",
    //     "pCategoryId": "0",
    //     "__v": 0
    //   },
    //   {
    //     "status": 1,
    //     "imgs": [],
    //     "_id": "5c7b7e598394492a54595029",
    //     "name": "泡泡",
    //     "desc": "我很贵很贵",
    //     "price": 20000,
    //     "detail": "<p>我都跟你说了我真的很贵</p>\n",
    //     "categoryId": "未选择",
    //     "pCategoryId": "0",
    //     "__v": 0
    //   }
    // ]

    return(
      <Card
        title={
          <div>
            <Select defaultValue='productName' onChange={value =>this.handleChange('searchType',value)}>
              <Option value='productName'>根据商品名称</Option>
              <Option value='productDesc'>根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={{width:200,marginLeft:10,marginRight:10}} onChange={e =>this.handleChange('searchName',e.target.value)}/>
            <Button type='primary' onClick={() =>this.getProducts(1,2)}>搜索</Button>
          </div>
        }
        extra={<Button type='primary' onClick={() => this.props.history.push('/product/saveupdate')}><Icon type="plus"/>添加产品</Button>}
      >

        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          pagination={{
            defaultPageSize: 2,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            total,
            onChange:this.getProducts,
            onShowSizeChange:this.getProducts
            // showQuickJumper:true,
          }}
          rowKey='_id'
          loading={products.length === 0}
        />


      </Card>

    )
  }
}
//从你的全世界路过