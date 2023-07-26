import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, NavBar } from 'antd-mobile'
import GoodsList from './components/GoodsList';
import { NAMESPACE } from './constants';
import PageWrap from '@/basic/PageWrap';

const Goods =  (props:any) => {
  const history  = useHistory();

  const handleBack = () => {
    history.push('/')
  }
  useEffect(() => {
    return () => {
      props.onReset();
    }
  },[])
  return (
    <PageWrap>
     <NavBar onBack={handleBack}>商品</NavBar>
       <GoodsList />
    </PageWrap>
  )
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(Goods);
