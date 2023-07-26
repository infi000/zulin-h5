import React, { FC, useState } from 'react';
import { ImageUploader, Space, Toast, Dialog, Modal, List } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
// import fetch from '@/utils/fetch';
import uploadFile from '@/utils/uploadFile';
import { servicePostUppayinfo } from '../services';

const UBankModal = (props: { data: any; visible: boolean; onClose: Function }) => {
  const { visible, data, onClose } = props;
  console.log(data);
  const handleAction = (e:any) => {
      const { key, text } = e;
      const map:any = {
          close:onClose
      }
      map[key]&& map[key]()
  }
  return (
    <Modal
      visible={visible}
      content={
        <div>
          <List header="收款人信息">
            <List.Item extra={data.bankuname}>收款人</List.Item>
            <List.Item extra={data.card}>银行卡号</List.Item>
            <List.Item extra={data.bankname}>开户行</List.Item>
            <List.Item extra={data.price}>金额</List.Item>
          </List>
        </div>
      }
      closeOnAction
      destroyOnClose
      onClose={() => {}}
      onAction={handleAction}
      actions={[
        {
          key: 'close',
          text: '关闭',
        },
      ]}
    ></Modal>
  );
};

export default UBankModal;
