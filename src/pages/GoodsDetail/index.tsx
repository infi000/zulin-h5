import React, { useEffect, useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, NavBar } from 'antd-mobile'
import GoodsDetail from './components/GoodsDetail';
import { NAMESPACE } from './constants';
import PageWrap from '@/basic/PageWrap';
import { getParamsFromUrl } from '@/utils/utils';

const GoodsDetailApp = (props:any) => {
  const history = useHistory();
  const [ shwoGoodsDetail, setShowGoodsDetail ] = useState(false);
  const handleBack = () => {
    history.goBack();
  }
  const { gid, sid } = getParamsFromUrl();
  const reFresh = () => {
    setShowGoodsDetail(false);
    setTimeout(() => {
      setShowGoodsDetail(true);
    }, 0);
  }

  useEffect(() => {
    reFresh()
  }, [JSON.stringify({gid, sid})])
  
  return (
    <PageWrap>
      <NavBar onBack={handleBack}>商品详情</NavBar>
      {shwoGoodsDetail && <GoodsDetail reFresh={reFresh} />}
    </PageWrap>
  )
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(GoodsDetailApp);
