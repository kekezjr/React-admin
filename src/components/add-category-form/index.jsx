import React,{Component} from 'react';
import {Form,Select, Input} from 'antd'
import PropTypes from 'prop-types';


const Option = Select.Option;
const Item = Form.Item;


class AddCategoryForm extends Component{

  static propTypes = {
    categories: PropTypes.array.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount(){
  //  把form对象传给父组件使用
    this.props.setForm(this.props.form);


  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {categories} = this.props;
    return(
        <Form>
          <Item label="所属分类">

            {
              getFieldDecorator(
                'parentId',
                {
                  initialValue:'0'
                }
              )(
                <Select>
                  <Option value="0">一级分类</Option>
                  {/*遍历显示*/}
                  {
                    categories.map(item =><Option key={item._id} value={item._id}>{item.name}</Option>)
                  }
              </Select>
              )
            }


          </Item>
          <Item label="分类名称">

            {
              getFieldDecorator(
                'categoryName',
                {}
              )(<Input placeholder="输入分类名称" />)
            }



          </Item>
        </Form>


    )
  }
}

export default Form.create()(AddCategoryForm);