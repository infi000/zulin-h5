import { SpinLoading, Space } from 'antd-mobile';
import React from 'react';
import styled from 'styled-components';


const Wrap = styled.div`

`

export default () => {

    return <Space justify='center' align='center' block style={{ height: '90vh' }}>
        <SpinLoading color='primary' style={{ '--size': '68px' }} />
    </Space>
}