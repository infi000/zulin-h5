import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { CapsuleTabs, Image } from 'antd-mobile'
import Login from './components/Login';
import Register from './components/Register';
import Styled from 'styled-components';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
  }
`
const logoSrc = LOGO;

const LoginApp = (props: IProps) => {
  const { type } = props;
  return (
    <Wrap>
      <Image src={logoSrc} />
      <div className='blank'></div>
      {
        type === 'login' && <Login />
      }
      {
        type === 'register' && <Register />
      }

      <div className='blank'></div>
    </Wrap>
  )
}

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(LoginApp);
