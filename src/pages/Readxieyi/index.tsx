import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { Button, CapsuleTabs, Grid, Image, NavBar, Space } from 'antd-mobile';
import View from './components/View';
import Styled from 'styled-components';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';
import PageWrap from '@/basic/PageWrap';
import SignatureCanvas from 'react-signature-canvas';
import { servicePostFile } from './services';

const Readxieyi = (props: IProps) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  React.useEffect(() => {
    // var canvas:any = document.getElementById('canvas')
    // const e = new SignaturePad(canvas);
    // setSignaturePad(e)
  }, []);

  return (
    <PageWrap>
      <NavBar onBack={handleBack}>阅读协议</NavBar>
      <View />
    </PageWrap>
  );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(Readxieyi);
