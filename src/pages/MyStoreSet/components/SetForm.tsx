
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';

import { Button, Dialog, Form, Input, Toast } from 'antd-mobile'
import { serviceGetStore, servicePostLogin, servicePostSet } from '../services';

const BankForm = (props: IProps) => {
  const { userInfo } = props;
  const [form] = Form.useForm()
  const history = useHistory();
  const onFinish = (value: any) => {
    servicePostSet(value).then(() => {

      Toast.show({
        content: '设置成功'
      })
    })
  }

  useEffect(() => {
    serviceGetStore({}).then((d: any) => {
      if (d) {
        const {storename } = d;
        form.setFieldsValue({
          storename
        })
      }

    })
  }, [])

  return <>
    <Form
      form={form}
      onFinish={onFinish}
      layout='horizontal'
      mode='card'
      footer={<>
        <Button block type='submit' color='primary' size='middle'>
          设置
      </Button>
      </>
      }>
      <Form.Item label='小店名称' name='storename' rules={[{ required: true, message: '不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>


    </Form>


  </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(BankForm);
