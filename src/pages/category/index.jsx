import React,{Component} from 'react';
import {Card,Button,Icon,Table,message,Modal } from 'antd';

//引入文件
import {reqCategory,reqAddCategory,reqUpDataCategoryName} from '../../api';
import AddCategoryForm from '../../components/add-category-form';
import MyButton from '../../components/my-button/index';
import UpdataCategoryNameForm from '../../components/upda-category';



export default class Category extends Component {

  state = {
    categories: [],   //保存所有的一级分类数据
    subCategories: [],   //保存所有的二级分类数据
    isShowAdd: false,
    isShowUpdata: false,
    parentId: '0',    //保存该显示父组件的分类，如果是一级组件就为0，如果不是就是二级分类
    category: {} , //选中的分类数据
    parentName:''
  }

  //获取Category分类列表
  getCategories = async parentId => {
    //  发送请求
    const result = await reqCategory(parentId)

    if (result.status === 0) {
      //  获取列表成功

      if (parentId === '0') {
        this.setState({
          // categories(result.data);
          categories: result.data
        })
      } else {
        this.setState({
          // categories(result.data);
          subCategories: result.data
        })
      }

    } else {
      message.error('列表请求失败')
    }
  }


  //添加分类功能的确定按钮
  addCategory = async () => {
    //  获取当前添加表单的数据
    const {parentId, categoryName} = this.form.getFieldsValue()
    // console.log(result);

    //  发送请求，后台添加分类数据
    const result = await reqAddCategory(parentId, categoryName);
    //初始话更新状态的对象
    let updataState = {isShowAdd:false};

    if (result.status === 0) {
      message.success('添加分类成功');
      const currentId = this.state.parentId;
      //更新数据
      if(parentId === '0'){
        // this.setState({
        //   //更新数据
        //   categories: [...this.state.categories, result.data],
        //   isShowAdd: false
        // })
        updataState.categories = [...this.state.categories, result.data];
      }else{
        if(currentId === parentId){
          // this.setState({
          //   subCategories:[...this.state.subCategories, result.data],
          //   isShowAdd: false,
          // })
          updataState.subCategories = [...this.state.subCategories, result.data];
        }
      }

    } else {
      message.error('添加分类失败');
      // this.setState({
      //   isShowAdd: false
      // })
    }
    //  清空用户输入的数据
    //  resetFields 重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件
    this.form.resetFields();

    //统一的更新状态
    this.setState(updataState);
  }

  //修改名称的按钮
  updataCategoryName = async () => {
    //  获取修改名称数据
    const categoryName = this.form.getFieldValue('categoryName');
    // console.log(categoryName);
    //  判断修改前后是否一致
    const {name, _id} = this.state.category;
    if (categoryName === name) {
      message.success('请修改品类名')

    } else {
      //  发送请求，修改名称
      const result = await reqUpDataCategoryName(_id, categoryName);

      if (result.status === 0) {
        message.success('修改分类名称成功')

        //  关闭对话框
        this.setState({
          isShowUpdata: false,
          //更新页面先显示
          categories: this.state.categories.map(item => {
            if (item._id === _id) {
              item.name = categoryName;
            }
            return item;

          }),


        })
      } else {
        message.error('修改分类名称失败')
        //关闭对话框
        this.setState({
          isShowUpdata: false,
        })
      }
    }
  }


  componentWillMount() {
    this.columns = [{
      title: '品类名称',
      dataIndex: 'name',
      // render: text => {text},
    }, {
      title: '操作',
      width: 400,
      render: category => {
        // console.log(category);
        const {parentId} = this.state;

        if(parentId === '0'){
          return  <div>
            <MyButton name="修改名称" onClick={() => {
              // console.log(category)
              this.setState({
                isShowUpdata: true,
                category
              })
            }
            }/> &nbsp;&nbsp;
            <MyButton name="查看其子品类项" onClick={() => {
              //让tabel显示分类数据
              this.setState({parentId:category._id , parentName:category.name})
              //请求二级分类数据
              this.getCategories(category._id)
            }}/>
          </div>
        }else{
          return <MyButton name="修改名称" onClick={() => {this.setState({isShowUpdata: true,category})}}/>
        }
      }
    }];
  }


  componentDidMount() {
    this.getCategories('0');
  }


  render() {
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

    const {categories, subCategories, isShowAdd, isShowUpdata, category, parentId,parentName} = this.state;

    //判断如果是一级组件就为0，如果不是就是二级分类，跳转
    const isCategory = parentId === '0';
    const data = isCategory ? categories : subCategories;

    return (
      <div>
        <Card
          title={
            isCategory
              ? "一级分类"
              : <div>
              <MyButton name="一级分类" onClick={() =>{

                this.setState({
                  parentId:'0'
                })
              }}/>
              <Icon type="arrow-right"/>&nbsp;&nbsp;
              {
                parentName
              }
            </div>
          }
          extra={<Button type='primary' onClick={() => this.setState({isShowAdd: true})}>
            <Icon type="plus"/>添加品类</Button>}
        >

          <Modal
            title="更新分类"
            visible={isShowUpdata}
            okText='确认'
            cancelText='取消'
            onOk={this.updataCategoryName}
            onCancel={() => this.setState({isShowUpdata: false})}
            width={300}
          >
            <UpdataCategoryNameForm categoryName={category.name} setForm={form => this.form = form}/>
          </Modal>


          <Table
            columns={this.columns}
            dataSource={data}
            bordered
            pagination={{
              pageSize: 9,
              showSizeChanger: true,
              pageSizeOptions: ['3', '6', '9', '12'],
              // showQuickJumper:true,
            }}
            rowKey='_id'
          />

          <Modal
            title="添加分类"
            visible={isShowAdd}
            okText='确认'
            cancelText='取消'
            onOk={this.addCategory}
            onCancel={() => {
              this.setState({isShowAdd: false})
            }}
          >
            <AddCategoryForm categories={categories} setForm={form => this.form = form}/>
          </Modal>

        </Card>
      </div>
    )
  }
}