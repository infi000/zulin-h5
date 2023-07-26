import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, NavBar } from 'antd-mobile'
import AddrList from './components/AddrList';
import AddrForm from './components/AddrForm';
import { NAMESPACE } from './constants';
import PageWrap from '@/basic/PageWrap';
import { IProps } from './types';

const AddrListApp = (props:IProps) => {
  const { modalInfo } = props;
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }
  
  return (
    <PageWrap>
    
      {
        modalInfo.show ? <AddrForm /> :  
        <>
        <NavBar onBack={handleBack}>我的地址</NavBar>
        <AddrList />
        </>
      }
    </PageWrap>
  )
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(AddrListApp);
