import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Space, Image, Card, Grid, List, Button } from 'antd-mobile';
import { ShopbagOutline, UserOutline, FileOutline, UnorderedListOutline, PayCircleOutline, PieOutline } from 'antd-mobile-icons'
import { TODO } from '@/utils/utils';






const OtherCon = (props: IProps) => {
    const { userInfo } = props;
    const history = useHistory();
    useEffect(() => {
    }, [])

    const handleMyAddress = () => {
        history.push('/h5/myAddress');
    }

    const handleQr = () => {
        history.push('/h5/qr');
    }

    const handleBank = () => {
        history.push('/h5/bank');
    }
    const handleXy = () => {
        history.push('/h5/readXieyi');
    }
    const handleLogin = () => {
        history.push('/h5/login');
    } 
    const handleOrder = () => {
        history.push('/h5/orders');
        
    }
    const handleInCome = () => {
        history.push('/h5/inCome');
        
    }
    const handleDp = () => {
        history.push('/h5/myStore');
        
    }
    return <Card>
        <List>
            <List.Item prefix={<PieOutline />} onClick={handleInCome}>
                我的资产
            </List.Item>
            <List.Item prefix={<UnorderedListOutline />} onClick={handleMyAddress}>
                我的地址
            </List.Item>
            <List.Item prefix={<PayCircleOutline />} onClick={handleBank}>
                我的银行卡
            </List.Item>
            <List.Item prefix={<ShopbagOutline />} onClick={handleOrder}>
                发货订单
            </List.Item>
            {/* <List.Item prefix={<PayCircleOutline />} onClick={handleQr}>
          我的二维码
        </List.Item> */}
            <List.Item prefix={<FileOutline />} onClick={handleXy}>
                协议查看
            </List.Item>
            <List.Item prefix={<PayCircleOutline />} onClick={handleDp}>
                我的店铺
            </List.Item>
         
            <List.Item prefix={<UserOutline />} >
                {`当前用户:${userInfo.nickname}`}
                <div style={{ float: 'right' }}>
                    <Button size='mini' color='primary' onClick={handleLogin} fill='none'>退出</Button>
                </div>
            </List.Item>

        </List>
    </Card>

}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(OtherCon);