
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';

import { Button, Dialog, Form, Input, Toast } from 'antd-mobile'
import { serviceGetsmscode, servicePostLogin } from '../services';

const Register = (props: IProps) => {
  const { postPostRegister, updateType } = props;
  const [form] = Form.useForm()
  const { validateFields } = form;
  const history = useHistory();
  const onFinish = (value:any) => {
    console.log(value);
    postPostRegister(value).then(() => {
      history.push('/');
    })
  }

  const handleLogin = () => {
    updateType('login');
  }

  const handleGetSmscode = () => {
    validateFields(['uphone']).then((d)  => {
      const { uphone } = d;
      serviceGetsmscode({phone:uphone}).then(()=>{
        Toast.show({content:'已发送'})
      })
    })
  }

  return <>
    <Form
      form={form}
      onFinish={onFinish}
      layout='horizontal'
      mode='card'
      footer={
        <Button block type='submit' color='primary' size='middle'>
          注册
      </Button>
      }>
      <Form.Item label='昵称'  name='uname'   rules={[{ required: true, message: '用户名不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>
      <Form.Item label='手机号'  name='uphone'   rules={[{ required: true, message: '手机号不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>
      <Form.Item label='密码'  name='password'   rules={[{ required: true, message: '密码不能为空' }]}>
        <Input placeholder='请输入' clearable type='password' />
      </Form.Item>
      <Form.Item label='验证码'  name='code'   rules={[{ required: true, message: '验证码不能为空' }]}  extra={<a onClick={handleGetSmscode}>验证码</a>}>
        <Input placeholder='请输入' clearable />
      </Form.Item>
      <Form.Item label='推荐人id'  name='rbuid' >
        <Input placeholder='请输入' clearable />
      </Form.Item>

    </Form>
    <Button block style={{margin:'20px auto', width:'300px'}} onClick={handleLogin}>
          返回登录
      </Button>
  </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(Register);
