import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Button, Dialog, Form, Grid, Input, Radio, Selector, Toast } from 'antd-mobile';
import { servicePostAddrAdd, servicePostAddrDel, servicePostAddrEdit } from '../services';
import styled from 'styled-components';

const WrapBtn = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    width: 100%;
  }
`;

const AddrForm = (props: IProps) => {
  const { updateModalInfo, modalInfo } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const history = useHistory();

  const onClose = () => {
    updateModalInfo({
      type: 'create',
      show: false,
      data: {},
    });
  };

  const onFinish = (value: any) => {
    console.log(value);
    const params = { ...value };
    if (Array.isArray(value.isdefault)) {
      params.isdefault = value['isdefault'][0];
    }
    console.log(params);
    if (modalInfo.type == 'create') {
      servicePostAddrAdd(params).then(() => {
        Toast.show({
          content: '提交成功',
        });
        onClose();
      });
    }
    if (modalInfo.type == 'edit') {
      servicePostAddrEdit({ ...params, aid: modalInfo.data.id }).then(() => {
        Toast.show({
          content: '提交成功',
        });
        onClose();
      });
    }
  };

  const handleBack = () => {
    onClose();
  };

  const handleDel = () => {
    servicePostAddrDel({ aid: modalInfo.data.id }).then(() => {
      Toast.show({
        content: '提交成功',
      });
      onClose();
    });
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        initialValues={modalInfo.data}
        mode="card"
        footer={
          <Button block type="submit" color="primary" size="middle">
            提交
          </Button>
        }
      >
        <Form.Item
          label="收件人姓名"
          name="uname"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input placeholder="请输入" clearable />
        </Form.Item>
        <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '不能为空' }]}>
          <Input placeholder="请输入" clearable />
        </Form.Item>
        <Form.Item label="省" name="province" rules={[{ required: true, message: '不能为空' }]}>
          <Input placeholder="请输入" clearable />
        </Form.Item>
        <Form.Item label="市" name="city" rules={[{ required: true, message: '不能为空' }]}>
          <Input placeholder="请输入" clearable />
        </Form.Item>
        <Form.Item label="区县" name="county" rules={[{ required: true, message: '不能为空' }]}>
          <Input placeholder="请输入" clearable />
        </Form.Item>
        <Form.Item label="详细地址" name="detail" rules={[{ required: true, message: '不能为空' }]}>
          <Input placeholder="请输入" clearable />
        </Form.Item>

        <Form.Item
          label="是否默认"
          name="isdefault"
          rules={[{ required: true, message: '不能为空' }]}
        >
          {/* <Input placeholder='请输入' clearable /> */}
          <Selector
            options={[
              { label: '默认', value: '1' },
              { label: '非默认', value: '2' },
            ]}
          />
        </Form.Item>
      </Form>

      <WrapBtn>
        <Grid columns={4} gap={1} style={{ textAlign: 'center' }}>
        <Grid.Item span={2}>
            <Button
              style={{ width: '100%' }}
              color="primary"
              shape="rectangular"
              onClick={handleBack}
              // fill='outline'
            >
              返回列表
            </Button>
          </Grid.Item>
          <Grid.Item span={2}>
            <Button
              style={{ width: '100%' }}
              color="danger"
              shape="rectangular"
              onClick={handleDel}
              // fill='outline'
            >
              删除
            </Button>
          </Grid.Item>

        </Grid>
      </WrapBtn>
    </>
  );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(AddrForm);
