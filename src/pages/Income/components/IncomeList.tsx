
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Dialog, Divider, Form, Grid, Image, List, Toast } from 'antd-mobile'
import { serviceGetBank, serviceGetIncomeStatics, servicePostLogin, servicePostSetbank } from '../services';
import { toPercent } from '@/utils/utils';

const Wrap = styled.div`
    width:100%;
    .list-p{
      padding:5px 9;
    }
    .list-extra{
      color:#333;
    }
    .con {
      height:100px;
      background-color:#fff;
      margin:10px;
      .con-item{
        text-align:center;
        .con-num{
          font-size:20px;
        }
        .con-desc{
          font-size:14px;
          color:#999;
        }
      }
    }
`
const WrapNav = styled.div`
    background-color:#fff;
    padding:10px;
    .page-btn {
       margin-right:4px;
    }


`

const IncomeList = (props: IProps) => {
  const { onSearch, onNav, tableList, listTotal, query } = props;
  const { page = 1, count = 10 } = query || {};

  const [inComstStatics, setIncomeStatics] = useState<any>({});
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
    onSearch && onSearch(({} as any));
    serviceGetIncomeStatics({}).then((d:any) => {
      setIncomeStatics(d);
      console.log(d);
    })
  }, [])
  const handleOnNave = (page: any) => {
    onNav && onNav(page);
  }

  const getPage = () => {
    return Math.ceil(Number(Number(listTotal) / count));
  }


  const getPageArr = () => {
    var a = new Array(getPage());
    var res = [];
    for (let index = 1; index <= a.length; index++) {
      res.push(index)
    }
    return res;
  }


  return <Wrap>
       <Grid columns={2} gap={0} className='con'>
          <Grid.Item className="con-item">
            <p className='con-num'>¥{inComstStatics.todaymoney}</p>
            <p className='con-desc'>今日资产</p>
          </Grid.Item>
          <Grid.Item className="con-item">
          {/* <Divider direction='vertical' /> */}
          <p className='con-num'>¥{inComstStatics.totalmoney}</p>
            <p className='con-desc'>累计资产</p>
          </Grid.Item>

        </Grid>
    <WrapNav>

      {
        getPageArr().map(item => {
          return <Button color='primary' size='small' fill={page == item ? 'solid' : 'outline'} className='page-btn' onClick={() => handleOnNave(item)} >{item}</Button>
        })
      }
    </WrapNav>
    <List header='资产明细'>
      {
        tableList?.map((item: any) => {
          const { ctime, income, thumbinal, gname, orderid, percent } = item;
          // return <List.Item extra={`¥${income}`}>
          //   {ctime}
          // </List.Item>
          return <List.Item
            key={orderid}
            prefix={
              <Image
                src={thumbinal}
                // style={{ borderRadius: 20 }}
                fit='cover'
                width={90}
                height={90}
              />
            }
            description={<div><p className='list-p'>{`订单号:${orderid}`}</p><p className='list-p'>{`${ctime}`}</p></div>}
            extra={<div className='list-extra'><p className='list-p'>{`¥${income}`}</p><p className='list-p'>{`资产率:${toPercent(percent)}`}</p></div>}
          >
            {gname}
          </List.Item>
        })
      }

    </List>
    <div style={{ height: '100px' }}></div>
  </Wrap>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(IncomeList);
// ctime: "2022-07-04 13:26:41"
// gid: "101"
// gname: "《丽莎的手套》"
// id: "227"
// income: "124.80"
// orderid: "7041240172756617495"
// percent: "0.02"
// thumbinal: "/Uploads/Goods/2022-06-29/62bc6d6f7948c.jpg"