import React, { useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { Button, CapsuleTabs, Result } from 'antd-mobile'
import Styled from 'styled-components';
import { LOGO } from '@/constants';
import { getParamsFromUrl } from '@/utils/utils';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
  }
  .bp{
    word-break: break-word;
    padding: 20px;
    text-align: center;
  }
`


const WrapBtn = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    width: 100%;
  }
`;
const logoSrc = LOGO;

const BlankTz = () => {
  const { url } = getParamsFromUrl();
  const fUrl = decodeURIComponent((url as any) || '');
  const history = useHistory();

  const [copy, setCopy] = useState(false);

  const handleBack = () => {
    window.location.href = '/me'
  }

  const src = window.location.origin + '/h5/blankZf?url=' + encodeURIComponent(fUrl);
  return (
    <Wrap>
      <Result
        status='info'
        title='请复制以下地址并使用默认浏览器打开'
      />
      <p className='bp'>
        {src}
      </p>
      <p className='bp'>
        <CopyToClipboard text={src}
          onCopy={() => setCopy(true)}>
          <Button shape='rectangular' color='success' >点击复制链接</Button>
        </CopyToClipboard>
       
      </p>
      <p className='bp'>
      {copy ? <span style={{ color: 'red' }}>已复制!</span> : null}
      </p>
      <WrapBtn>
        <Button shape='rectangular' color='primary' onClick={handleBack} >返回</Button>
      </WrapBtn>
    </Wrap>
  )
}


export default BlankTz
