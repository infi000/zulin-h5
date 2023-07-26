import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, Image, NavBar, Space } from 'antd-mobile'
import SetForm from './components/SetForm';
import Styled from 'styled-components';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';
import PageWrap from '@/basic/PageWrap';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
  }
`
const logoSrc = LOGO;

const MyStoreSet = (props: IProps) => {
  const { type } = props;
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  }
  return (
    <PageWrap>
    <NavBar onBack={handleBack}>小店设置</NavBar>
    <Space>
      <span></span>
    </Space>
    <SetForm />
  </PageWrap>
  )
}

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(MyStoreSet);
