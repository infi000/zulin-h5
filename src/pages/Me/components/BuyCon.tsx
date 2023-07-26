import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Space, Image, Card, Grid } from 'antd-mobile';
import { BillOutline, TruckOutline, TextOutline, ShopbagOutline } from 'antd-mobile-icons'






const BuyCon = (props: IProps) => {
    const history = useHistory();
    useEffect(() => {
    }, [])

    const handleBuyWarehouse = (name:string) => {
        history.push('/h5/BuyWarehouse?tabName='+name);
    }

    return <Card title='买方'>
        <Grid columns={4} gap={8} >
            <Grid.Item  style={{textAlign:'center'}}>
                <Space direction='vertical' justify='center' onClick={()=>handleBuyWarehouse('我的仓库')}>
                    <div style={{ textAlign: 'center' }}>
                        <TruckOutline fontSize='20' />
                    </div>
                    <div>我的仓库</div>
                </Space>
            </Grid.Item>
            <Grid.Item   style={{textAlign:'center'}}>
                <Space direction='vertical' justify='center' onClick={()=>handleBuyWarehouse('确认付款')}>
                    <div style={{ textAlign: 'center' }}>
                        <BillOutline fontSize='20' />
                    </div>
                    <div>确认付款</div>
                </Space>
            </Grid.Item>
            <Grid.Item   style={{textAlign:'center'}}>
                <Space direction='vertical' justify='center' onClick={()=>handleBuyWarehouse('确认收款')}>
                    <div style={{ textAlign: 'center' }}>
                        <ShopbagOutline fontSize='20' />
                    </div>
                    <div>确认收款</div>
                </Space>
            </Grid.Item>
            <Grid.Item   style={{textAlign:'center'}}>
                <Space direction='vertical' justify='center' onClick={()=>handleBuyWarehouse('已完成')}>
                    <div style={{ textAlign: 'center' }}>
                        <TextOutline fontSize='20' />
                    </div>
                    <div>已完成</div>
                </Space>
            </Grid.Item>
        </Grid>

    </Card>

}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(BuyCon);
