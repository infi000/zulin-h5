/* eslint-disable */
import React, { useState, Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import Loading from '@/pages/Loading';
import fetch from '@/utils/fetch';
import AvatarImg from './components/AvatarImg';
import generateMenu from './utils/generateMenu';
import { NavBar, TabBar } from 'antd-mobile';
import './Layout.sass';
import styled from 'styled-components';
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import  wx from 'weixin-js-sdk';
import { _getIsWxClient } from '@/utils/utils';
import { useEnv } from '@/utils/hooks';

const Wrap = styled.div`
  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .top {
    flex: 0;
    border-bottom: solid 1px var(--adm-color-border);
  }

  .body {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: whitesmoke;
    .body-con {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: scroll;
    }
  }

  .bottom {
    flex: 0;
    border-top: solid 1px var(--adm-color-border);
  }
`;

const Layout2 = (props) => {
  const {
    powerInfo,
    children,
    isLoading,
    location: { pathname },
  } = props;
  const menus = generateMenu(powerInfo);
  const history = useHistory();
  // const [ env, setEnv ] = useState(3); 
  const env = useEnv();
  const setRouteActive = (value) => {
    if(value == 'wx'){
          wx.miniProgram.reLaunch({ url: '/pages/Main/index?from=h5' });

      return;
    }else{
      history.push(value);

    }
  };

  useEffect(() => {
    const { checkLogin, getAreas, initDesensit } = props;
    checkLogin();
  }, []);
  return (
    <Wrap>
      <div className="app">
        <div className="body">
          <div className="body-con">{isLoading ? <Loading /> : children}</div>
        </div>
        <div className="bottom">
          <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
           {env  == 1 && <TabBar.Item key={'wx'} icon={UnorderedListOutline} title='商城' />} 
            {menus.map((item) => (
              <TabBar.Item key={item.path} icon={item.icon} title={item.name} />
            ))}
          </TabBar>
        </div>
      </div>
    </Wrap>
  );
};

export default withRouter(connect(...withStore('basic'))(Layout2));
