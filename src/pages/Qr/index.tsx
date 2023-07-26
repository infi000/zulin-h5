import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, NavBar } from 'antd-mobile'
import { NAMESPACE } from './constants';
import PageWrap from '@/basic/PageWrap';
import { IProps } from './types';
import QRCode from 'qrcodejs2';
import styled from 'styled-components';

const WrapQr = styled.div`
  width:300px;
  height:300px;
  margin:100px auto;
  .qr-con{
    width:100%;
    height:100%;
  }
`

const QrApp = (props:IProps) => {
  const { modalInfo,userInfo  } = props;
  const history = useHistory();
  const location = useLocation();
  const qrcodeDom = React.useRef(null);


  const handleBack = () => {
    history.goBack();
  }
  
  useEffect(()  => {
    const { id } = userInfo;
    const { origin } = window.location;
    new QRCode(qrcodeDom.current, {
      text: origin + "/h5/registerForQr?rbuid="+id,
      width: 300,
      height: 300,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  });
  },[])
  return (
    <PageWrap>
                  <NavBar onBack={handleBack}>我的二维码</NavBar>

      <WrapQr>
        <div  className='qr-con'  ref={qrcodeDom}></div>
      </WrapQr>
    </PageWrap>
  )
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(QrApp);
