import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, Image, NavBar } from 'antd-mobile'
import Styled from 'styled-components';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';
import PageWrap from '@/basic/PageWrap';
import WeiTuo from './components/WeiTuo';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
  }
`

const WeiTuoApp = (props: IProps) => {
  const { type } = props;
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }
  return (
    // {
    //   type === 'login' && <Login />
    // }
    <PageWrap>
      <NavBar onBack={handleBack}>委托上架</NavBar>
      <WeiTuo />
      </PageWrap>
  )
}

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(WeiTuoApp);
