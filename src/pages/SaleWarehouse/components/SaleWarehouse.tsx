import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { BUY_STATUS, BUY_TAG_MAP, NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import { Space, Image, Tabs, Grid, Card, Button, Empty, SpinLoading, Toast, Ellipsis, ImageViewer, Modal } from 'antd-mobile';
import { BillOutline, TruckOutline, TextOutline, ShopbagOutline } from 'antd-mobile-icons';
import UploaderImg from './UploaderImgModal';
import { serviceGetSaleOrders, serviceGetUserBank, servicePostCancelbuyorder, servicePostComplaintorder, servicePostSalepayed, servicePostSetPayed } from '../services';
import UBankModal from './UBankModal';
import { getParamsFromUrl } from '@/utils/utils';
import { LOGO, NO_PAY } from '@/constants';

const TAB_MAP = Object.entries(BUY_STATUS).map(([key, title]) => ({ key, title }));
const DEFAULT_KEY = '1,2,3,7';
const SaleWarehouseApp = (props: IProps) => {
    const history = useHistory();
    const [list, setList] = useState<any>([]);
    const [uploadModal, setUploadModal] = useState<any>({ show: false, data: '' })
    const [uBankModal, setUBankModal] = useState<any>({ show: false, data: {} })
    const [loading, setLoading] = useState<boolean>(false);
    const [imageInfo, setImageInfo] = useState<any>({ show: false, data: '' });
    const [defaultKey, setDefaultKey] = useState<string>(DEFAULT_KEY);
    useEffect(() => {
        const { tabName } = getParamsFromUrl();
        const dk = BUY_TAG_MAP.find(item => item.title == tabName)?.status || DEFAULT_KEY;
        setDefaultKey(dk);
        getList(dk);
    }, []);

    const getList = (status: string) => {
        setLoading(true);
        serviceGetSaleOrders({ status, page:1 , count: 100 })
            .then((d: any) => {
                const { orders = [] } = d;
                setList(orders);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChange = (e: string) => {
        setDefaultKey(e);
        setList([]);
        getList(e);
    };

    const reFresh  = () => {
        setList([]);
        getList(defaultKey);
    }

    // 卖方投诉订单
    const handleComplaintorder = (oid: string) => {
        servicePostComplaintorder({ oid }).then((d: any) => {
            Toast.show({ content: '提交成功' })
            reFresh();
        })
    }

    // 确认支付 
    const handleSalepayed = (oid: string) => {
        servicePostSalepayed({ oid }).then((d: any) => {
            Modal.alert({
                content: '抢拍成功！ 平台将免费保管48小时，请在期间完成提货或重新上架！超期每日收取1%保管费用。',
                onConfirm: () => {
                  console.log('Confirmed')
                },
              })
            reFresh();
        })
    }
    // 查看凭证
    const handleViewPayPic = (opt: any) => {
        console.log('opt', opt);
        setImageInfo({ show: true, data: opt.paypic || NO_PAY })
    }

    return (
        <>
            <Tabs activeKey={defaultKey}  onChange={handleChange}>
            {BUY_TAG_MAP.map(({ title, status }) => {
                    return <Tabs.Tab title={title} key={status}></Tabs.Tab>;
                })}
            </Tabs>
            {loading ? (
                <Space justify='center' align='center' style={{ width: '100%', height: '300px' }}>
                    <SpinLoading style={{ '--size': '48px' }} color="currentColor" />
                </Space>
            ) : Array.isArray(list) && list.length > 0 ? (
                list?.map((item: any) => {
                    return (
                        <Card
                            // title={`订单${item.orderid}`}
                            title={
                                <Space justify='between' block style={{ width: '100%' }}>
                                    <span> {`订单:${item.orderid}`}</span>
                                    <span> {`状态:${BUY_STATUS[item.status]}`}</span>
                                </Space>
                            }
                        >
                            <Grid columns={3} gap={2}>
                                <Grid.Item span={2}>
                                    <Ellipsis direction="end" content={`商品名称：${item.gname || '-'}`} />
                                </Grid.Item>
                                <Grid.Item span={1}>场次：{`${item.sname}`}</Grid.Item>
                                <Grid.Item span={2}>所有人：{item.ownname}</Grid.Item>
                                <Grid.Item span={1}>价格：¥{item.curprice}</Grid.Item>
                                <Grid.Item span={1}>
                                    <Space direction="vertical" justify="center" style={{ width: '100%' }}>
                                        <Image src={item.thumbinal} width={100} height={100} fit="contain" />
                                    </Space>
                                </Grid.Item>
                                <Grid.Item span={3}>
                                    <Space wrap>
                                        {
                                            ['2'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleSalepayed(item.id)}>收款确认</Button>
                                        }
                                        {
                                            ['2'].includes(item.status) && <Button block shape="rectangular" color="default" size="mini" onClick={() => handleViewPayPic(item)}>查看凭证</Button>
                                        }
                                        {
                                            // ['2','3'].includes(item.status) && <Button block shape="rectangular" color="default" size="mini" onClick={() => handleComplaintorder(item.id)}>客服投诉</Button>
                                            ['100'].includes(item.status) && <Button block shape="rectangular" color="default" size="mini" onClick={() => handleComplaintorder(item.id)}>客服投诉</Button>
                                        }
                                    </Space>
                                </Grid.Item>
                            </Grid>
                        </Card>
                    );
                })
            ) : (
                <Empty description="暂无数据" />
            )}
            <UploaderImg oid={uploadModal.data} visible={uploadModal.show} onClose={() => setUploadModal({ show: false, data: '' })} />
            <UBankModal data={uBankModal.data} visible={uBankModal.show} onClose={() => setUBankModal({ show: false, data: {} })} />
            <ImageViewer image={imageInfo.data} visible={imageInfo.show} onClose={() => { setImageInfo({ show: false, data: '' }) }} />
        </>
    );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(SaleWarehouseApp);
