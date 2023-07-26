import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE, stype } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import { Space, Image, Button, Grid, Ellipsis, ActionSheet } from 'antd-mobile';
import styled from 'styled-components';
import { CountDown, getParamsFromUrl } from '@/utils/utils';
import { serviceGetTimer } from '../services';
import { useDebounce } from '@/utils/hooks';

const WrapImg = styled.div`
  width: 100%;
  height: 200px;
`;
const WrapS = styled.div`
width: 100%;
margin: 0 auto;
  .con {
    background: #fff;
    padding: 10px;
    margin-bottom: 6px;
    box-shadow: 1px 3px 3px #eeeaea;
    .con-title{
      font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
    }
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

const GoodsDetail = (props: IProps & { reFresh: () => void }) => {
  const { getGoodsItem, goodsItem, userInfo, reFresh } = props;
  const history = useHistory();
  const { gid, sid } = getParamsFromUrl();
  console.log( { gid, sid });
  const [ actionInfo , setActionInfo] = useState<any>({show:false, data:  []})
  useEffect(() => {
    getGoodsItem && getGoodsItem({ gid });

  }, []);

  const handleOrderBUy = () => {
    history.push(`/h5/orderBuy?gid=${gid}&showid=${sid}`)
  }

  const debounc = useDebounce(handleOrderBUy, [])

  const [timerID, setTimerID] = useState(null);

  const [counter, setCounter] = useState(10000000);
  const handleClick = (gid: any) => {
    const { sid } = getParamsFromUrl();
    console.log(1231232131);
    // history.goBack();
    history.push(`/h5/goodsDetail?gid=${gid}&sid=${sid}`);
    // history.go(0)
}
  const handleSize = () => {
    if(Array.isArray(goodsItem.oshoes) && goodsItem.oshoes.length>0){
     const re =  goodsItem.oshoes.map( item => {
        const key = item.id;
        const text = item.shoessize;
        return { key, text}
      })
      setActionInfo({ show: true, data: re})
    }else{
      setActionInfo({ show: true, data: []})
    }
  }
  useEffect(() => {

    if (counter > 0 && counter !== 10000000) {
      let timer: any = setTimeout(() => {
        setCounter(counter - 1)
      }, 1000);
      setTimerID(timer)
    }
    return () => {
      setTimerID(null)
    }
  }, [counter]);

  useEffect(() => {
    serviceGetTimer({ gid, sid }).then((d: any) => {
      setCounter(d);
    }).catch(() => {

    })
  }, [])
  return (
    <>
      <Grid columns={3} gap={8}>
        <Grid.Item span={3}>
          <Image src={goodsItem.goodspic} width={'100%'} height={300} fit="contain" />
        </Grid.Item>
        <Grid.Item span={3}>
          <WrapS>
            <Grid.Item span={3}>
              <div className='con'>
                <div className='con-title'>商品信息</div>
                <Grid columns={3} gap={8}>
                  <Grid.Item span={3}>
                    <Ellipsis direction="end" content={`商品名称：${goodsItem.gname || '-'}`} />
                  </Grid.Item>
                  <Grid.Item span={3}>
                    尺码：{goodsItem.shoessize}
                  </Grid.Item>
                  <Grid.Item span={2}>拍卖人：{goodsItem.ownuname}</Grid.Item>
                  <Grid.Item span={1}>价格：¥{goodsItem.curprice}</Grid.Item>
                </Grid>
              </div>
            </Grid.Item>
            <Grid.Item span={3}>
              <div className='con'>
                <div className='con-title'>商品内容</div>
                <div>{goodsItem.content}</div>
              </div>
            </Grid.Item>
            <Grid.Item span={3}>
              <div className='con'>
                <div className='con-title'>商品描述</div>
                <div>{goodsItem.gdes}</div>
              </div>
            </Grid.Item>
            <Grid.Item span={3}>
              <div className='con'>
                <h3>商品详情</h3>
              </div>
            </Grid.Item>
            {goodsItem?.details?.map((item) => {
              return (
                <Grid.Item span={3}>
                  <Image src={item.pic} width={'100%'} height={300} fit="contain" />
                </Grid.Item>
              );
            })}
          </WrapS>
        </Grid.Item>
        <div style={{ height: '40px' }}></div>
      </Grid>
      {
        userInfo.uid !== goodsItem.ownuid &&

        <WrapBtn>
          <Grid columns={4} gap={0.5}>
          <Grid.Item span={4}>
              <Button shape='rectangular' color='warning' onClick={handleSize}>其他尺码</Button>
            </Grid.Item>
            <Grid.Item span={1}>
              <Button shape='rectangular' color='primary' onClick={reFresh}>刷新</Button>

            </Grid.Item>
            <Grid.Item span={3}>
              {
                counter == 0 ?
                  <Button shape='rectangular' color='primary' onClick={debounc}>立即抢购</Button> :
                  counter > 300 ?
                    <Button shape='rectangular' color='warning' >抢购未开始</Button> :
                    <Button shape='rectangular' color='warning' >抢购倒计时 还剩{CountDown(counter)}</Button>
              }
            </Grid.Item>
          </Grid>


        </WrapBtn>
      }
    <ActionSheet
        extra='请选择其他尺码'
        cancelText='取消'
        visible={actionInfo.show}
        actions={actionInfo.data}
        onAction={action => {
          handleClick(action.key)
        }}
        onClose={() => setActionInfo({show: false, data: []})}
      />
    </>
  );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(GoodsDetail);
