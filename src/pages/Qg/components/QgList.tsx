import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { NAMESPACE, stype } from '../constants';
import { IProps } from '../types';
import { useEffect } from 'react';
import { Space, Image, Card } from 'antd-mobile';
import styled from 'styled-components';

const WrapImg = styled.div`
    width:100%;
    height:200px;
`
const WrapS = styled.div`
    width:100%;
    height:230px;
    /* background-color:red; */
    .footer {
  padding-top: 11px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-start;
}
`



const QgList = (props: IProps) => {
    const { getList, tableList } = props;
    const history = useHistory();
    useEffect(() => {
        getList && getList();
    }, [])

    const handleClick = (sid:string) => {
        history.push(`/h5/goods?sid=${sid}`)
    }


    return tableList?.map((item) => {
        return <Card
            title={stype[item.stype]}
            style={{ margin: '10px', backgroundColor: '#fff' }}
            onClick={() => handleClick(item.id)}
        >
            <WrapS >
                <WrapImg>
                    <Image src={item.pic} width={'100%'} height={'100%'} fit='contain' />
                </WrapImg>
                <div className='footer'>【{item.sname}】:{item.stime}~{item.etime} </div>
            </WrapS>

        </Card>
    })
}


const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(
    withRouter,
    connect(...injectStore),
)(QgList);
