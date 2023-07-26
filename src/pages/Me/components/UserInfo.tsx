import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Space, Image, Card, Grid, List, Button } from 'antd-mobile';
import { BillOutline, TruckOutline, TextOutline, ShopbagOutline } from 'antd-mobile-icons'






const UserInfo = (props: IProps) => {
    const { userInfo } = props;
    const history = useHistory();
    useEffect(() => {
    }, [])

    const handleBuyWarehouse = (name:string) => {
        history.push('/h5/BuyWarehouse?tabName='+name);
    }

    return <Card title='用户信息'>
            <List>
          <List.Item
            prefix={`当前用户:${userInfo.nickname}`}
            // description='Deserunt dolor ea eaque eos'
          >
 
            <div style={{float:'right'}}>
            <Button size='mini' color='primary'>退出</Button>

            </div>
          </List.Item>
        </List>
        </Card>

}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(UserInfo);
