
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';

import { Button, Dialog, Form, Input } from 'antd-mobile'
import { servicePostLogin } from '../services';

const Login = (props: IProps) => {
  const { postPostLogin, updateType } = props;
  const [form] = Form.useForm()
  const history = useHistory();
  const onFinish = (value:any) => {
    postPostLogin(value).then(() => {
      history.push('/');
    })
  }

  const handleRegister = () => {
    updateType('register');
  }

  return <>
    <Form
      form={form}
      onFinish={onFinish}
      layout='horizontal'
      mode='card'
      footer={<>
        <Button block type='submit' color='primary' size='middle'>
          登录
      </Button>
      </>
      }>
      <Form.Item label='手机号'  name='uphone'   rules={[{ required: true, message: '手机号不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>
      <Form.Item label='密码'  name='password'   rules={[{ required: true, message: '密码不能为空' }]}>
        <Input placeholder='请输入' clearable type='password' />
      </Form.Item>

    </Form>

    {/* <Button block  style={{margin:'20px auto', width:'300px'}} onClick={handleRegister}>
          注册
      </Button> */}
  </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(Login);
