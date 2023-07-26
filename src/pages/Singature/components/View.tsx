
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import IframeContainer from '@/components/IframeContainer';
import { Button, Dialog, Form, Input } from 'antd-mobile'

const Wrap = Styled.div`
  position: absolute;
    bottom: 0;
    height: 100px;
    width: 100%;
    text-align: center;
    line-height: 100px;
`

const View = (props: IProps) => {
    const { postPostLogin, updateType } = props;
    const [form] = Form.useForm();
    const history = useHistory();
    const handleClick = () => {
        updateType('sigature')
    }
    const [timerID, setTimerID] = useState(null);

    const [counter, setCounter] = useState(20);
  
    useEffect(() => {
  
      if(counter > 0){
        let timer:any = setTimeout(() => {
          setCounter(counter-1)
        }, 1000);
        setTimerID(timer)
      }
      return () => {
        setTimerID(null)
      }
    },[counter]);


    return <>
        <IframeContainer url='https://api.lingyuan888.com/Uploads/xieyi/062700100873.html' />
        <Wrap>
            <Button color='primary' onClick={handleClick} disabled={counter!==0}> 已阅读{counter}</Button>
        </Wrap>

    </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(View);
