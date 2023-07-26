import React from 'react'
import { CapsuleTabs, NavBar } from 'antd-mobile'
import { withRouter, useHistory } from 'react-router-dom';
import BuyWarehouse from './components/BuyWarehouse';
import styled from 'styled-components';
import PageWrap from '@/basic/PageWrap';

const Wrap  = styled.div`
  padding:10px;
  .adm-tabs{
    background-color:#fff;
    margin-bottom:10px;
  }
  .adm-card{
    background-color:#fff;
    margin-bottom:10px;
    .adm-card-header-title{
      width: 100%
    }
  }
  .adm-empty{
    background-color:#fff;
  }
  /* background-color:#fff; */
`;

 const BuyWarehouseApp =  () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }
  return (
    <PageWrap>
            <NavBar onBack={handleBack}>买方仓库</NavBar>

      <Wrap>
    <BuyWarehouse />
    </Wrap>
    </PageWrap>
  )
}

export default BuyWarehouseApp;