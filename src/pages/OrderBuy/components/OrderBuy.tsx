import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE, stype } from '../constants';
import { IProps } from '../types';
import { useEffect, useMemo } from 'react';
import { Space, Image, Button, Grid, Ellipsis, Dialog, Card } from 'antd-mobile';
import styled from 'styled-components';
import { getParamsFromUrl } from '@/utils/utils';
import { servicePostOderBuy } from '@/pages/GoodsDetail/services';
import { useDebounce } from '@/utils/hooks';

const BP = styled.div`
  font-weight:bold;
`;
const WrapS = styled.div`
  width: 100%;
  height: 250px;
  padding-bottom: 10px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  /* background-color:red; */
  .footer {
    padding-top: 11px;
    padding-left: 11px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: flex-start;
  }
`;

const WrapBtn = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    width: 100%;
  }
`;

const OrderBuy = (props: IProps) => {
  const { getGoodsItem, goodsItem, addrList, getAddrList } = props;
  const history = useHistory();
  useEffect(() => {
    const params = getParamsFromUrl();
    getAddrList && getAddrList({});
    getGoodsItem && getGoodsItem(params);
  }, []);
  console.log('addrList',addrList);

  const memoAddr = useMemo(() => {
    const target = addrList.find(item => {
      return item.isdefault == '1'
    }) || addrList[0] || '';
console.log('target',target);
    return target;
  }, [addrList.length])

  const handleSendOrder = () => {
    const { gid, showid } = getParamsFromUrl();
    servicePostOderBuy({ gid, showid }).then(() => {
      Dialog.alert({
        content: '抢购成功，请尽快支付！',
        onConfirm: () => {
          history.push('/h5/goods?sid='+showid)
        },
      })
    })
  }

  const debounceSendOrder  = useDebounce(handleSendOrder,[])

  return (
    <>
     <Card >
      <Grid columns={3} gap={8}>
        <Grid.Item span={3}>
          {
            memoAddr ?     <Space direction='vertical'>
            <BP>{memoAddr.uname} {memoAddr.phone}</BP>
            <BP>{memoAddr.province} {memoAddr.city} {memoAddr.county}</BP>
            <BP>{memoAddr.detail} </BP>
          </Space>:
          <Space direction='vertical'>暂无地址（去设置）</Space>
          }
<div  style={{borderBottom:'1px  solid #ccc', paddingBottom:'30px'}}></div>
        </Grid.Item>
        <Grid.Item span={3}>
          <Grid columns={3} gap={2}>
            <Grid.Item span={3}>
              <BP>{`商品名称：${goodsItem.gname || '-'}`}</BP>
            </Grid.Item>
            <Grid.Item span={2}><BP>所有人：{goodsItem.ownuname}</BP></Grid.Item>
            <Grid.Item span={1}><BP>价格：¥{goodsItem.curprice}</BP></Grid.Item>
            <Grid.Item span={3}>
              <Space direction="vertical" justify="center" style={{ width: '100%' }}>
                <Image src={goodsItem.goodspic} width={300} height={300} fit="contain" />
           
              </Space>
            </Grid.Item>
            
          </Grid>
        </Grid.Item>
        {/* <Grid.Item span={1}>
          <Image src={goodsItem.goodspic} width={'100%'} height={100} fit="contain" />
        </Grid.Item>
        <Grid.Item span={1}>
        </Grid.Item>

        <Grid.Item span={1}>
          X1
        </Grid.Item> */}
        <div style={{ height: '40px' }}></div>
      </Grid>
      </Card>
      <WrapBtn>
      <Card>
        <Grid columns={3} gap={8}>
          <Grid.Item span={2}>
          <BP>合计：¥{goodsItem.curprice}</BP>
          </Grid.Item>
          <Grid.Item span={1}>    <Button shape='rectangular' color='primary' onClick={debounceSendOrder}>提交订单</Button></Grid.Item>
        </Grid>
</Card>
      </WrapBtn>
    </>
  );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(OrderBuy);
