
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';

import { Button, Dialog, Form, Input, Toast } from 'antd-mobile'
import { serviceGetBank, servicePostLogin, servicePostSetbank } from '../services';

const BankForm = (props: IProps) => {
  const { userInfo } = props;
  const disabled = userInfo.editbank == '1' ? false: true;
  const [form] = Form.useForm()
  const history = useHistory();
  const onFinish = (value: any) => {
    servicePostSetbank(value).then(() => {

      Toast.show({
        content: '设置成功'
      })
    })
  }

  useEffect(() => {
    serviceGetBank({}).then((d: any) => {
      if (d) {
        const { bankuname, card, bankname } = d;
        form.setFieldsValue({
          bankuname, card, bankname
        })
      }

    })
  }, [])

  return <>
    <Form
      form={form}
      disabled={disabled}
      onFinish={onFinish}
      layout='horizontal'
      mode='card'
      footer={<>
        <Button disabled={disabled} block type='submit' color='primary' size='middle'>
          设置
      </Button>
      </>
      }>
      <Form.Item label='姓名' name='bankuname' rules={[{ required: true, message: '不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>
      <Form.Item label='卡号' name='card' rules={[{ required: true, message: '不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>
      <Form.Item label='开户行' name='bankname' rules={[{ required: true, message: '不能为空' }]}>
        <Input placeholder='请输入' clearable />
      </Form.Item>

    </Form>
      <p style={{padding:'20px'}}>
      平台采用C2C模式，填写银行卡信息用于接受其他玩家支付的货款，保证交易正常进行。详细参见协议。
      </p>

  </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(BankForm);
