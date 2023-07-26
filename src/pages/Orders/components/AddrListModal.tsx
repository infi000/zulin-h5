import React, { FC, useEffect, useState } from 'react';
import { ImageUploader, Space, Toast, Dialog, Modal, List } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
// import fetch from '@/utils/fetch';
import uploadFile from '@/utils/uploadFile';
import { serviceGetAddr, servicePostgoodstosend, servicePostUppayinfo } from '../services';

const AddrListModal = (props: { data: any; visible: boolean; onClose: Function }) => {
  const { visible, data, onClose } = props;
  const [addrList, setAddrList] = useState<any[]>([]);

  const handleTh = (opt: any) => {
    Modal.alert({
      title: '确认提货？',
      content: `地址:${opt.city} ${opt.county} ${opt.detail}`,
      confirmText: '确认',
      onConfirm: () => {
        servicePostgoodstosend({ oid:data,addressid:opt.id  }).then((d: any) => {
          Toast.show({ content: '提取成功' });
          onClose();
        })
      }

    })
  }
  const handleAction = (e: any) => {
    const { key, text } = e;
    const map: any = {
      close: onClose,
    }
    map[key] && map[key]()
  }

  useEffect(() => {
    serviceGetAddr({}).then((d: any) => {
      const { addresses } = d;
      if (Array.isArray(addresses)) {
        setAddrList(addresses)
      }
    })

  }, [])

  return (
    <Modal
      visible={visible}
      content={
        <div>
          <List mode='card' header='点击选择收获地址'>
            {
              addrList.map((item: any) => {
                const { detail, county, city } = item;
                return <List.Item extra={`${city} ${county}`} onClick={() => handleTh(item)} >
                  {detail}
                </List.Item>
              })
            }
            {
              addrList.length === 0 && <span>无收货地址,请前往我的-地址管理添加</span>
            }
          </List>
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

export default AddrListModal;
