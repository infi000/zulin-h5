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
import { getParamsFromUrl } from '@/utils/utils';






const UserInfo = (props: IProps) => {
  const { storeInfo } = props;
  const history = useHistory();
  useEffect(() => {
  }, [])
  const { uid } = getParamsFromUrl();

  const handleSet = () => {
    history.push('/h5/myStoreSet');
  }

  return <Grid columns={4} gap={8}>
    <Grid.Item span={2}>
      <h3 style={{textAlign:'center'}}>
        {storeInfo.storename || `${storeInfo.nickname}的小店`}

      </h3>
    </Grid.Item>
    <Grid.Item span={2}>
      {!uid &&     <h3 style={{textAlign:'center'}} onClick={handleSet}>
        设置
    </h3>}
  
    </Grid.Item>
  </Grid>

}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(UserInfo);
