import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE, stype } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Space, Image, Card, Grid, Button, JumboTabs, Tabs, Modal } from 'antd-mobile';
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
        padding: 11px 10px 0;
    border-top: 1px solid #e5e5e5;
    width: 100%;
    box-sizing: border-box;
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
    const { getGoodsList, onSearch, goodsList, onNav, query, goodsTotal } = props;
    const { page = 1, count = 10 } = query || {};

    const history = useHistory();
    // const [ page, setPage ] = React.useState<any>({page:1, count:10})
    useEffect(() => {
        const params: any = getParamsFromUrl();
        onSearch && onSearch(params);
    }, [])

    const handleClick = (gid: string) => {
        const { sid } = getParamsFromUrl();
        history.push(`/h5/goodsDetail?gid=${gid}&sid=${sid}`);
    }
    const handleOnNave = (page: any) => {
        onNav(page);
    }

    const getPage = () => {
        return Math.ceil(Number(Number(goodsTotal) / count));
    }

    const refresh = () => {
        getGoodsList();
    }
    const handleRefresh = useDebounce(refresh, [], 500)
    const getPageArr = () => {
        var a = new Array(getPage());
        var res = [];
        for (let index = 1; index <= a.length; index++) {
            res.push(index)
        }
        return res;
    }
    const handleToStore = (uid: any) => {
        Modal.alert({
            title: '确认进入？',
            confirmText: '确认',
            onConfirm: () => {
                history.push(`/h5/myStore?uid=${uid}`);

            },
            closeOnMaskClick: true,
            showCloseButton: true,

          })
    }


    return <>
        <WrapNav>
            {
                getPageArr().map(item => {
                    return <Button color='primary' size='small' fill={page == item ? 'solid' : 'outline'} className='page-btn' onClick={() => handleOnNave(item)} >{item}</Button>
                })
            }
            <Button color='primary' size='small' fill='outline' className='page-btn' onClick={handleRefresh} >刷新</Button>
        </WrapNav>

        <Grid columns={2} gap={8}>
            {
                goodsList?.map((item, index) => {
                    const { gstatus, onsaledate } = item;
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
                        <WrapS >
                            <WrapImg onClick={() => { res == '正常' && handleClick(item.id) }}>
                                <Image src={item.thumbinal} width={'100%'} height={'100%'} fit='contain' />
                            </WrapImg>
                            <div className='footer'>
                                {/* <Space direction='vertical'>
                                    <span onClick={() => { res == '正常' && handleClick(item.id) }}>¥:{item.curprice}元   {`${res == '已售罄' ? `（已售罄）` : ''}`} </span>
                                    <span>



                                        <span onClick={() => { res == '正常' && handleClick(item.id) }}>{item.gname}</span>
                                        <span onClick={() => { res == '正常' && handleToStore(item.ownuid) }} style={{ fontWeight: 'bold' }}>{item.storename ? item.storename : `${item.ownuname}的小店`}</span>
                                    </span>
                                </Space> */}
                                <Grid columns={4} gap={8} >
                                    <Grid.Item span={4}>
                                    <span onClick={() => { res == '正常' && handleClick(item.id) }}>¥:{item.curprice}元   {`${res == '已售罄' ? `（已售罄）` : ''}`} </span>

                                    </Grid.Item>
                                    <Grid.Item span={2} style={{textAlign:'left'}}>
                                    <span onClick={() => { res == '正常' && handleClick(item.id) }}>{item.gname}</span>

                                    </Grid.Item>
                                    <Grid.Item span={2} style={{textAlign:'right'}}>
                                    <span onClick={() => { res == '正常' && handleToStore(item.ownuid) }} style={{ fontWeight: 'bold' }}>{item.storename ? item.storename : `${item.ownuname}的小店`}</span>

                                    </Grid.Item>
                                </Grid>
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
