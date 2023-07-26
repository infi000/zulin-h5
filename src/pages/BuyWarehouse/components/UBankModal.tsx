import React, { FC, useState } from 'react';
import { ImageUploader, Space, Toast, Dialog, Modal, List, Button } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
// import fetch from '@/utils/fetch';
import uploadFile from '@/utils/uploadFile';
import { servicePostUppayinfo } from '../services';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';


const BP = styled.p`
  padding-bottom:10px;
  border-bottom: 1px solid #ececec;
  .adm-space{
    width:100%;
    font-size:13px;
  }
  .desc{
  }
  .adm-button{
    margin-left: 4px;
  }
`

const UBankModal = (props: { data: any; visible: boolean; onClose: Function }) => {
  const { visible, data, onClose } = props;
  const handleAction = (e: any) => {
    const { key, text } = e;
    const map: any = {
      close: onClose
    }
    map[key] && map[key]()
  }
  return (
    <Modal
      visible={visible}
      title='收款人信息'
      content={
        <div>
          <BP>
            <Space direction='vertical'>
              <Space justify='between'>
                <span>收款人：</span>
                <span className='desc'>{data.bankuname}<CopyToClipboard text={data.bankuname} onCopy={() => { Toast.show({ content: '复制成功' }) }}><Button color='primary' size='mini'>复制</Button></CopyToClipboard></span>
                </Space>
            </Space>
          </BP>
          <BP>
            <Space direction='vertical'>
              <Space justify='between'>
                <span>银行卡号：</span>
                <span className='desc'>{data.card}<CopyToClipboard text={data.card} onCopy={() => { Toast.show({ content: '复制成功' }) }}><Button color='primary' size='mini'>复制</Button></CopyToClipboard></span> 
                </Space>
            </Space>
          </BP>
          <BP>
            <Space direction='vertical'>
              <Space justify='between'><span>开户行：</span><span className='desc'>{data.bankname}<CopyToClipboard text={data.bankname} onCopy={() => { Toast.show({ content: '复制成功' }) }}><Button color='primary' size='mini'>复制</Button></CopyToClipboard></span></Space>
            </Space>
          </BP>
          <BP>
            <Space direction='vertical'>
              <Space justify='between'><span>金额：</span><span className='desc'>{data.price}<CopyToClipboard text={data.price} onCopy={() => { Toast.show({ content: '复制成功' }) }}><Button color='primary' size='mini'>复制</Button></CopyToClipboard></span></Space>
            </Space>
          </BP>
        </div>
      }
      closeOnAction
      destroyOnClose
      onClose={() => { }}
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
