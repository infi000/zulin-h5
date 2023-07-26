import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, NavBar } from 'antd-mobile'
import OrderBuy from './components/OrderBuy';
import { NAMESPACE } from './constants';
import PageWrap from '@/basic/PageWrap';

const OrderBuyApp = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }
  
  return (
    <PageWrap>
      <NavBar onBack={handleBack}>商品详情</NavBar>
      <OrderBuy />
    </PageWrap>
  )
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(OrderBuyApp);
