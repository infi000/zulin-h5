import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Space, Image, Card, Grid, Button, JumboTabs, Tabs } from 'antd-mobile';
import styled from 'styled-components';
import { getParamsFromUrl } from '@/utils/utils';
import moment from 'moment';
import { useDebounce } from '@/utils/hooks';

const WrapImg = styled.div`
    width:100%;
    height:200px;
`
const WrapS = styled.div`
    width:100%;
    height:300px;
    padding-bottom:10px;
    background-color:#fff;
    border:1px solid #dfdfdf;
    box-sizing:border-box;
    position: relative;
    .abg {
        position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #838383ad;
    }
    /* background-color:red; */
    .footer {
  padding-top: 11px;
  padding-left: 11px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-start;
}
`

const WrapNav = styled.div`
    background-color:#fff;
    padding:10px;
    .page-btn {
       margin-right:4px;
    }

`



const GoodsList = (props: IProps) => {
    const { goods, } = props;

    const history = useHistory();


    const handleClick = (gid: string, sid: string) => {
        history.push(`/h5/goodsDetail?gid=${gid}&sid=${sid}`);
    }


    return <>


        <Grid columns={2} gap={8}>
            {
                goods?.map((item, index) => {
                    const { gstatus, onsaledate, onsalestatus } = item;
                    let res: '正常' | '已售罄' = '正常';

                    if (['7'].includes(gstatus)) {
                        if (Number(onsaledate) > moment().unix()) {
                            res = '已售罄';
                        } else {
                        }
                    } else {
                        res = '已售罄'
                    }
                    return <Grid.Item>
                        <WrapS onClick={() => { res == '正常' && handleClick(item.id, item.onsale) }}>
                            <WrapImg>
                                <Image src={item.thumbinal} width={'100%'} height={'100%'} fit='contain' />
                            </WrapImg>
                            <div className='footer'>
                                <Grid columns={3} gap={8}>
                                    <Grid.Item span={3}>{item.gname}</Grid.Item>
                                    <Grid.Item span={3}>¥:{item.curprice}元   {`${res == '已售罄' ? `（已售罄）` : ''}`}</Grid.Item>
                                    <Grid.Item span={2}>
                                        {['7'].includes(gstatus) && ['1'].includes(onsalestatus) && <span>秒杀活动</span>}
                                        {['7'].includes(gstatus) && ['0'].includes(onsalestatus) && <span>个人店铺</span>}
                                    </Grid.Item>

                                </Grid>
                                {/* <Space direction='vertical'>
                                    
                                    <span>¥:{item.curprice}元   {`${res == '已售罄' ? `（已售罄）` : ''}`} </span>
                                    <span>{item.gname}</span>
                                    {['7'].includes(gstatus) && ['1'].includes(onsalestatus) && <span>秒杀活动</span>}
                                    {['7'].includes(gstatus) && ['0'].includes(onsalestatus) && <span>个人店铺</span>}
                                </Space> */}
                            </div>
                            <div className={res == '已售罄' ? 'abg' : ''}></div>
                        </WrapS></Grid.Item>;
                })
            }
            <div style={{ height: '100px' }}></div>
        </Grid>
    </>



}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(GoodsList);
