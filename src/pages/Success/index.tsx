import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { Button, CapsuleTabs, Card, Image, Result } from 'antd-mobile'
import Login from './components/Login';
import Register from './components/Register';
import Styled from 'styled-components';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';
import styled from 'styled-components';

const Wrap = Styled.div`
  height:100vh;
  .blank  {
    height:100px
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

const SuccessApp = (props: IProps) => {
  const { type } = props;
  const history = useHistory();
  const handleBack = () => {
    history.push('/me')

  }
  return (
    <Wrap>
            <Result
          status='success'
          title='完成'
          // description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
              <WrapBtn>
      <Card>
      {/* <Button shape='rectangular' color='primary'  onClick={handleBack}>返回</Button> */}
</Card>
      </WrapBtn>
    </Wrap>
  )
}

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
  withRouter,
  connect(...injectStore),
)(SuccessApp);
