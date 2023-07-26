import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import QgList from './components/QgList';
import { NAMESPACE, VERIFY_MAP } from './constants';
import { Space, Empty, Card, Dialog, Button, List, Modal, NoticeBar, Swiper } from 'antd-mobile';
import { IProps } from './types';
import styeld from 'styled-components';

const NWarp = styeld.div`
background: #fff;
margin-bottom: 10px;

`

const MAP = [
  {
    name: '用户须知',
    url: 'https://api.lingyuan888.com/Uploads/xieyi/yhxz.html'
  },
  {
    name: '用户协议',
    url: 'https://api.lingyuan888.com/Uploads/xieyi/yhxy.html'
  },
  {
    name: '平台用户协议注册',
    url: 'https://api.lingyuan888.com/Uploads/xieyi/ptyhxyzc.html'
  },
  {
    name: '委托寄售服务协议',
    url: 'https://api.lingyuan888.com/Uploads/xieyi/wtjsfwxy.html'
  },
  {
    name: '用户隐私协议',
    url: 'https://api.lingyuan888.com/Uploads/xieyi/yhysxy.html'
  },
  {
    name: 'C2C个人支付风险提示',
    url: 'https://api.lingyuan888.com/Uploads/xieyi/c2cgrzffxts.html'
  },
]




const QgApp = (props: IProps) => {
  const { userInfo } = props;
  const history = useHistory();
  const handleXy = (url: string) => {
    history.push('/h5/readXieyi?url=' + url);
  }
  return (
    <>
      {(userInfo.isverify === '2') ?
        <>
          <NWarp>
            {/* <NoticeBar content='请仔细阅读《平台用户协议》' color='info' extra={
              <Space style={{ '--gap': '12px' }}>
                <span  onClick={handleXy}>查看详情</span>
              </Space>
            }/> */}
            <Swiper autoplay indicator={() => null} loop>
              {
                MAP.map((item) => {
                  return <Swiper.Item key={item.name}>

                    <NoticeBar content={`请仔细阅读《${item.name}》`} color='info' extra={
                      <Space style={{ '--gap': '12px' }}>
                        <span onClick={() => handleXy(item.url)}>查看详情</span>
                      </Space>
                    } />
                  </Swiper.Item>
                })
              }


            </Swiper>
          </NWarp>
          <QgList />
        </> :
        <div style={{ padding: '20px' }}>
          <>
            <h3>注册状态：{VERIFY_MAP[userInfo.isverify]}</h3>
            <Card title='本页面需要完成以下设置'>
              <List.Item onClick={() => { history.push(`/h5/singature`) }}>阅读协议</List.Item>
              <List.Item onClick={() => { history.push(`/h5/bank`) }}>设置银行卡信息</List.Item>
              <List.Item onClick={() => { history.push(`/h5/myAddress`) }}>设置地址</List.Item>
              {/* {userInfo.isreadagreement !== '1' && <List.Item onClick={() => {  history.push(`/h5/singature`)}}>阅读协议</List.Item>}
          {!userInfo.card && <List.Item onClick={() => {  history.push(`/h5/bank`) }}>设置银行卡信息</List.Item>} */}
            </Card>
          </>
        </div>
      }
    </>
  )
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(QgApp);
