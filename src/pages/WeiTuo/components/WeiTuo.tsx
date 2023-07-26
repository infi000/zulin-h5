
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Image, Form, Grid, Input, Space, Radio, Selector, Toast, Stepper, Slider, Dialog } from 'antd-mobile'
import { serviceGetsetting, serviceGetTableList, servicePostLogin, servicePostMiniPay, servicePostOnsale, servicePostPay } from '../services';
import { getCookie, getParamsFromUrl, TODO } from '@/utils/utils';
import { useEnv } from '@/utils/hooks';
import wx from 'weixin-js-sdk';

const WrapBtn = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    width: 100%;
  }
`;


const InputAdn = styled.div`
    width: 120px;
    text-align: left;
    color: black;
`;
const marks = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
}

const WeiTuo = (props: IProps) => {
  const { orderItem, updateType } = props;
  const [form] = Form.useForm()
  const env = useEnv();
  const [ setting, SetSetting] = useState<{ onsalerates?:string;onsalepercent?:string }>({});
  // const [ changci, setChangCi ] = useState<any[]>([]);
  const history = useHistory();
  const [ alertMsg, setAlertMsg] = useState('');

  /**
   * 
  公式调整： 委托价格 = 购买价格*（1+收益率+手续费）
  =8091X（1+0.02+0.02）
  手续费 = 购买价格X0.02
  
  仓库保管费：  默认 0元。
    逾期：购买价格 X 1%X 逾期天数
       提示：48小时内免费。超过时限，按照购买费用1%收取·。
  收益率：  默认价格涨幅。
    0.5比例下降到0。
    自定义不限制
  自定义范围：-100%~100%之间
  超过系统设定增长率：2% 弹窗警告
  
   */

  // 手续费
  const onsalerates = (Number(setting['onsalerates'])) * 0.01;

  // 收益率
  const onsalepercent = (Number(setting['onsalepercent'])) * 0.01;
  //购买价格
  const curPrice = Number(orderItem?.price) || 10;
  // 委托价格
  const saleprice = Number((curPrice * (1 + onsalerates + onsalepercent)).toFixed(0));
  // 手续费
  const chargemoney = (curPrice * onsalerates).toFixed(2);
  const onFinish = (value: any) => {

  }


  const onPay = () => {
    if (env == 1) {

      const wxid = getCookie('openid');
      servicePostMiniPay({
        oid: orderItem.id,
        wxid,
      }).then((data: any) => {
        console.log('data', data);
        wx.miniProgram.reLaunch({ url: '/pages/H5BuyPage/index?arraydata=' + encodeURIComponent(JSON.stringify(data.arraydata)) });
      })
    } else {
      servicePostPay({
        oid: orderItem.id,
      }).then((data: any) => {
        if (data) {
          const { h5_url } = JSON.parse(data);
            // const tzUrl = h5_url+`&redirect_url=https%3A%2F%2Fh5.lingyuan888.com/h5/success`;
            const tzUrl = h5_url+`&redirect_url=https%3A%2F%2Fh5.beijingyanhuakeji.com/h5/success`;
          const res = '/h5/blankTz?url=' + encodeURIComponent(tzUrl);
          console.log(res);
          console.log(res);
          window.location.href = res;
        }
      })
    }
  }

  const handleSubmit = () => {
    form.validateFields().then((val: any) => {
      const { chargemoney, saleprice } = val;
      const { showid } = orderItem;
      const fn = () => servicePostOnsale({
        oid: orderItem.id,
        sid: showid,
        saleprice,
        chargemoney
      }).then(() => {
        onPay();
      })
      if(alertMsg){
        Dialog.alert({
          content: <span style={{color:'red'}}>{alertMsg}</span>,
          onConfirm: fn
        })
      }else{
        fn()
      }
    })
  }

  const FnAlertMsg = (c:any) => {
    console.log('onsalepercent',onsalepercent);
    const e = c*0.01
    let msg = '' ;
    if(Number(e)  ==  Number(onsalepercent) ){
      setAlertMsg(msg);
      return;
    }
    if(Number(e) > Number(onsalepercent) ){
      msg = '收益高于秒杀活动设定，不能参与秒杀。作品将上架到个人店铺出售。个人店铺依靠自发引流完成交易，请谨慎上架。';
    }
    if(Number(e)< Number(onsalepercent)) {
      msg = '收益低于秒杀活动设定，不能参与秒杀。作品将上架到个人店铺出售。个人店铺依靠自发引流完成交易，请谨慎上架。';
    }
    setAlertMsg(msg);
    console.log(msg);
    Dialog.alert({
      content: <span style={{color:'red'}}>{msg}</span>,
    })
    // Toast.show({
    //   content:msg,
    //   position: 'top',
    //   duration: 4000,
    // })
  }


  const handleInputChange = (e: any) => {
    // 收益率 = 销售价格/购买价格 - （1+手续费率）
    const uSale = Number((e / curPrice - (1 + onsalerates)).toFixed(3))
    form.setFieldsValue({
      userSalePercent: (uSale*100).toFixed(2)
    })
    FnAlertMsg(e);
  }

  const handleUserSaleChange = (e:any) => {
    console.log(e);
        const saleprice = Number((curPrice * (1 + onsalerates + e*0.01)).toFixed(2));
    // 销售价格= 购买价格*（1 + 手续费率 + 收益率）
    // 收益率 = 销售价格/购买价格 - （1+手续费率）
    form.setFieldsValue({
      saleprice
    })
    FnAlertMsg(e);
  }

  useEffect(() => {
    const { status } = getParamsFromUrl();
    if (status == '6') {
      // onPay();
    } else {
      serviceGetsetting({}).then((d: any) => {
        const { setting = {} } = d || {};
        SetSetting(setting);
      })
    }


    // serviceGetTableList({}).then((d:any) => {
    //     if(d && d.showings && Array.isArray(d.showings)){
    //       const res = d.showings.map((item:any) => {
    //         // belongto: "1"
    //         // describe: "2"
    //         // etime: "23:59"
    //         // id: "3"
    //         // pic: "/Uploads/Goods/2022-06-22/62b32cca94e80.jpg"
    //         // sname: "123"
    //         // status: "1"
    //         // stime: "13:00"
    //         // stype: "2"
    //         return {
    //           label:`【${item.sname}】${item.stime}~${item.etime}`,
    //           value: item.id
    //         }
    //       })
    //       setChangCi(res);
    //     }
    // })
  }, [])

  useEffect(() => {
    const { status } = getParamsFromUrl();
    if (status == '6') {
      env && onPay();
    }
  }, [env])

  useEffect(() => {
    if (typeof saleprice === 'number' && chargemoney !== 'NaN') {
      console.log(`{saleprice,chargemoney }`, { saleprice, chargemoney });
      form.setFieldsValue({
        saleprice, chargemoney, userSalePercent: onsalepercent*100
      })
    }

  }, [saleprice, chargemoney])


  return <>
    <Card
      title={`订单编号：${orderItem.orderid}`}
    >
      <Grid columns={3} gap={8}>
        <Grid.Item span={1}>
          <Space direction="vertical" justify="center" style={{ width: '100%' }}>

            <Image src={orderItem.thumbinal} width={100} height={100} fit="contain" />
          </Space>
        </Grid.Item>
        <Grid.Item span={2}>

          <Space direction="vertical" justify="center" style={{ width: '100%' }}>
            <span>商品名称 :{orderItem.gname}</span>
            <span>购买价格：¥{orderItem.price}</span>
          </Space>
        </Grid.Item>

      </Grid>
    </Card>
    <Form
      form={form}
      onFinish={onFinish}
      layout='horizontal'
      mode='card'>
      <Form.Item label='委托价格¥' name='saleprice' rules={[{ required: true, message: '不能为空' }]} initialValue={saleprice}   extra={<InputAdn>元</InputAdn>}>
       <Input placeholder='请输入' clearable type='number' disabled min={1} onChange={handleInputChange} />
      </Form.Item>
      <Form.Item label='手续费¥' name='chargemoney' rules={[{ required: true, message: '不能为空' }]} initialValue={chargemoney}  extra={<InputAdn>元</InputAdn>}>
        <Input placeholder='请输入' clearable type='number' min={1} disabled />
      </Form.Item>
      <Form.Item label='收益率' name='userSalePercent' rules={[{ required: true, message: '不能为空' }]} initialValue={onsalepercent*100}  extra={<InputAdn>%</InputAdn>}>
        <Stepper step={0.5} min={0}  onChange={handleUserSaleChange}/>
      </Form.Item>
      <Form.Item label='' name='userSalePercent' rules={[{ required: true, message: '不能为空' }]} initialValue={onsalepercent*100}>
        <Slider
          step={0.5}
          min={0}
          max={3}
          marks={marks}
          ticks
          style={{ overflow: 'hidden' }}
          onChange={handleUserSaleChange}
        />
      </Form.Item>
      <Form.Item label='场次'>
        <span>{alertMsg? '个人店铺' : orderItem.sname}</span>
      </Form.Item>

    </Form>

    <Card title='保管费用说明' >
      您好，因您未按平台保管时间段上架该商品，平台将收取仓库保管费，仓库保管费时效：拍下商品后48小时内免费保管。超出48小时将每24小时收取拍品金额的1％，该详情及计算公式请查看用户须知第35条。

        </Card>
    <WrapBtn>
      <Grid columns={3} gap={8}>
        <Grid.Item span={2}>
          合计：¥{chargemoney}
        </Grid.Item>
        <Grid.Item span={1}>    <Button shape='rectangular' color='primary' onClick={handleSubmit}>确认上架</Button></Grid.Item>
      </Grid>

    </WrapBtn>
  </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(WeiTuo);
