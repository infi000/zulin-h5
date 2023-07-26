import React from 'react'
import { CapsuleTabs, Image, List } from 'antd-mobile'
import BuyCon from './components/BuyCon';
import styled from 'styled-components';
import SaleCon from './components/SaleCon';
import OtherCon from './components/OtherCon';
import { LOGO } from '@/constants';
import UserInfo from './components/UserInfo';

const CardWrap  = styled.div`
  margin-bottom:10px;
  .adm-list-item-content{
    font-size:14px;
    font-weight:bold;
  }
`
const logoSrc = LOGO;

export default () => {
  React.useEffect(() => {
  },[])
  return (
    <>

    <Image src={logoSrc} height="200px" fit='cover' />
    {/* <UserInfo /> */}
    <CardWrap>
    <BuyCon />
    </CardWrap>
    <CardWrap>
    <SaleCon />
    </CardWrap>
    <CardWrap>
    <OtherCon />
    </CardWrap>
    </>
  )
}