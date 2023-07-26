/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import withStore from '@/store/withStore';
import Loading from '@/pages/Loading';
import './Layout.sass';
import styled from 'styled-components';

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
    children,
    isLoading,
  } = props;

  return (
    <Wrap>
      <div className="app">
        <div className="body">
          <div className="body-con">{isLoading ? <Loading /> : children}</div>
        </div>
      </div>
    </Wrap>
  );
};

export default withRouter(connect(...withStore('basic'))(Layout2));
