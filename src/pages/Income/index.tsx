import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, Image, List, NavBar, Space } from 'antd-mobile'
import Styled from 'styled-components';

import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';
import PageWrap from '@/basic/PageWrap';
import IncomeList from './components/IncomeList';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
  }
`
const logoSrc = LOGO;

const Income = (props: IProps) => {
  const { type } = props;
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  }
  return (
    <PageWrap>
    <NavBar onBack={handleBack}>我的资产</NavBar>
      <IncomeList ></IncomeList>
  </PageWrap>
  )
}

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(Income);
