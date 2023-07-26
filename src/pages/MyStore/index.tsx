import React from 'react'
import { CapsuleTabs, Image, List, NavBar } from 'antd-mobile'
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { LOGO } from '@/constants';
import UserInfo from './components/UserInfo';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import Goods from './components/Goods';
import { getParamsFromUrl } from '@/utils/utils';

const CardWrap  = styled.div`
  margin-bottom:10px;
  .adm-list-item-content{
    font-size:14px;
    font-weight:bold;
  }
`
const logoSrc = LOGO;

const MyStore =  (props:IProps) => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  }
  React.useEffect(() => {
    const params: any = getParamsFromUrl();
    
    props.getStoreInfo({...params});
    props.getGoods({...params});
  
  },[])
  return (
    <>
  <NavBar onBack={handleBack}>小店设置</NavBar>
    <Image src={logoSrc} height="200px" fit='cover' />
    <UserInfo />
    <Goods />
    </>
  )
}



const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(MyStore);
