
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import IframeContainer, { IframeContainer2 } from '@/components/IframeContainer';
import { Button, Dialog, Form, Input } from 'antd-mobile'
import { getParamsFromUrl } from '@/utils/utils';

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
   const { url } =  getParamsFromUrl();
    return <>
        <IframeContainer2 url={(url as any) || `https://api.lingyuan888.com/Uploads/xieyi/062700100873.html`} />
    </>
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(View);
