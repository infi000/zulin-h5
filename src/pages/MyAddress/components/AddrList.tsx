import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE, stype } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import { Space, Image, Button, Grid, Ellipsis, List } from 'antd-mobile';
import styled from 'styled-components';
import { getParamsFromUrl } from '@/utils/utils';
import { serviceGetMyAddress } from '../services';

const WrapImg = styled.div`
  width: 100%;
  height: 200px;
`;
const WrapS = styled.div`
  width: 100%;
  height: 250px;
  padding-bottom: 10px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  /* background-color:red; */
  .footer {
    padding-top: 11px;
    padding-left: 11px;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: flex-start;
  }
`;

const WrapBtn = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  button {
    width: 100%;
  }
`;

const AddrList = (props: IProps) => {
  const { addrList, getAddrList, updateModalInfo } = props;
  const history = useHistory();
  useEffect(() => {
    getAddrList  &&   getAddrList({});
  }, []);

  const handleCreate = () => {
    updateModalInfo({
      type:'create',
      data:{},
      show: true,
    })
  }
const  handleEdit  =  (opt:any)  => {
  updateModalInfo({
    type:'edit',
    data:opt,
    show: true,
  })
  }

  return (
    <>
         <List mode='card' header='地址列表'>
    {
      addrList.map((item:any) => {
        const { detail,county,city } = item;
        return     <List.Item extra={`${city} ${county}`} onClick={() => handleEdit(item)}>
        {detail}
      </List.Item>
      })
    }
    </List>
      <WrapBtn>
        <Button color='primary'  shape='rectangular' onClick={handleCreate}>添加地址</Button>
      </WrapBtn>
    </>
  );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(AddrList);
