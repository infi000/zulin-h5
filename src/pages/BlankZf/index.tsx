import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, Result } from 'antd-mobile'
import Styled from 'styled-components';
import { LOGO } from '@/constants';
import { getParamsFromUrl } from '@/utils/utils';
import { useEffect } from 'react';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
  }
`
const logoSrc = LOGO;
// 支付
const BlankZf = () => {
  const { url } = getParamsFromUrl();
  useEffect(() => {

    if (url) {
      const fUrl = decodeURIComponent((url as any));
      console.log('furl',fUrl);
      console.log('url',url);
      window.location.href = fUrl;

    }
  }, [])
  return (
    <Wrap>
      <Result
        status='waiting'
        title='等待处理'
      // description={url}
      />
    </Wrap>
  )
}


export default BlankZf
