import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
import './formtest.scss';

export default class FormTestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavKey: ''
    };
    console.log('ok');
  }
  renderFormNew() {
    return (
      <Form horizontal className="ant-advanced-search-form">
        <Row gutter={16}>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
          <Col sm={8}>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
            <FormItem
              label="较长搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <DatePicker size="default" />
            </FormItem>
            <FormItem
              label="搜索名称"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input placeholder="请输入搜索名称" size="default" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button>清除条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    let style = {
      fontsize: '22px',
      color: 'red'
    };
    return (
      <div>
        <div>
          <i className="fa fa-search" style={style}/>
        </div>
        {this.renderFormNew()}
      </div>
    );
  }
}
