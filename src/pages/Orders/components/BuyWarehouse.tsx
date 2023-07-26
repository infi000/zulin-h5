import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, withRouter, useLocation, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { BUY_STATUS, BUY_TAG_MAP, NAMESPACE } from '../constants';
import { IProps } from '../types';
import { useEffect, useState } from 'react';
import { Space, Image, Tabs, Grid, Card, Button, Empty, SpinLoading, Toast, ImageViewer, Ellipsis } from 'antd-mobile';
import { BillOutline, TruckOutline, TextOutline, ShopbagOutline } from 'antd-mobile-icons';
import UploaderImg from './UploaderImgModal';
import { serviceGetBuyOrders, serviceGetUserBank, servicePostCancelbuyorder, servicePostgoodstosend, servicePostSetPayed } from '../services';
import UBankModal from './UBankModal';
import AddrListModal from './AddrListModal';
import { getParamsFromUrl, TODO } from '@/utils/utils';
import { LOGO, NO_PAY } from '@/constants';

const DEFAULT_KEY = '5';
const BuyWarehouseApp = (props: IProps) => {
    const [list, setList] = useState<any>([]);
    const history = useHistory();
    const [uploadModal, setUploadModal] = useState<any>({ show: false, data: '' })
    const [uBankModal, setUBankModal] = useState<any>({ show: false, data: {} })
    const [addrModal, setAddrModal] = useState<any>({ show: false, data: '' })
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
        serviceGetBuyOrders({ status, page:1,  count:100 })
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

    const reFresh = () => {
        setList([]);
        getList(defaultKey);
    }

    // 取消订单
    const handleCancel = (oid: string) => {
        servicePostCancelbuyorder({ oid }).then((d: any) => {
            Toast.show({ content: '取消成功' });
            reFresh();
        })
    }

    // 上传凭证
    const handleUpload = (oid: string) => {
        setUploadModal({ show: true, data: oid })
    }

    // 去支付
    const handleUBank = (oid: string) => {
        serviceGetUserBank({ oid }).then((d: any) => {
            setUBankModal({ show: true, data: d })
        })
    }

    // 确认支付 
    const handleSetPayed = (oid: string) => {
        servicePostSetPayed({ oid }).then((d: any) => {
            Toast.show({ content: '确认成功' });
            reFresh();
        })
    }

    // 提取货物
    const handleGoodstosend = (oid: string) => {
        setAddrModal({ show: true, data: oid })
    }

    // 委托上架
    const handleWeiTuo = (opt: any) => {
        (props as any).updateOrderItem(opt);
        const { status } = opt;
        history.push('/h5/weiTuo?status=' + status)
    }

    // 查看凭证
    const handleViewPayPic = (opt: any) => {
        console.log('opt', opt);
        setImageInfo({ show: true, data: opt.paypic || NO_PAY })
    }


    return (
        <>
            {/* <Tabs onChange={handleChange} activeKey={defaultKey}>
                {BUY_TAG_MAP.map(({ title, status }) => {
                    return <Tabs.Tab title={title} key={status}></Tabs.Tab>;
                })}
            </Tabs> */}
            {loading ? (
                <Space justify='center' align='center' style={{ width: '100%', height: '300px' }}>
                    <SpinLoading style={{ '--size': '48px' }} color="currentColor" />
                </Space>
            ) : Array.isArray(list) && list.length > 0 ? (
                list?.map((item: any) => {
                    return (
                        <Card
                            title={
                                <Space justify='between' block style={{ width: '100%' }}>
                                    <span> {`订单:${item.orderid}`}</span>
                                    <span> {`状态:${BUY_STATUS[item.status]}`}</span>
                                </Space>
                            }
                        >
                            <Grid columns={3} gap={2}>
                                <Grid.Item span={3}>
                                    <Ellipsis direction="end" content={`商品名称：${item.gname || '-'}`} />
                                </Grid.Item>
                                <Grid.Item span={2}>所有人：{item.ownuname}</Grid.Item>
                                <Grid.Item span={1}>价格：¥{item.price}</Grid.Item>
                                <Grid.Item span={1}>
                                    <Space direction="vertical" justify="center" style={{ width: '100%' }}>
                                        <Image src={item.thumbinal} width={100} height={100} fit="contain" />
                                    </Space>
                                </Grid.Item>


                                <Grid.Item span={3}>
                                    <Space wrap style={{ width: '100%' }}>
                                        {
                                            ['1'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleUBank(item.id)}>1.去支付</Button>
                                        }
                                        {
                                            ['1'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleUpload(item.id)}>2.上传凭证</Button>
                                        }
                                        {
                                            ['1', '2'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleViewPayPic(item)}>3.查看凭证</Button>
                                        }
                                        {
                                            ['1'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleSetPayed(item.id)}>4.支付确认</Button>
                                        }
                                        {
                                            ['1'].includes(item.status) && <Button block shape="rectangular" color="primary" fill='outline' size="mini" onClick={() => handleCancel(item.id)}>5.取消订单</Button>
                                        }
                                        {
                                            ['3'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleGoodstosend(item.id)}>6.提取货物</Button>
                                        }
                                   
                                        {
                                            ['100'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={TODO} >7.客服投诉</Button>
                                            // ['2', '3'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={TODO} >客服投诉</Button>
                                        }
                                        {
                                            ['3'].includes(item.status) && <Button block shape="rectangular" color="primary" size="mini" onClick={() => handleWeiTuo(item)}>8.委托上架</Button>
                                        }
                                        {
                                            ['6'].includes(item.status) && <><Button shape="rectangular" color="primary" size="mini" onClick={() => handleWeiTuo(item)}>9.上架费支付</Button>
                                            {/* <Button fill='outline' shape="rectangular" color="primary" size='small' onClick={() => handleWeiTuo(item)}>支付结果刷新</Button> */}
                                            </>

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
            <UploaderImg oid={uploadModal.data} visible={uploadModal.show} onClose={() => { setUploadModal({ show: false, data: '' }); reFresh(); }} />
            <UBankModal data={uBankModal.data} visible={uBankModal.show} onClose={() => { setUBankModal({ show: false, data: {} }); reFresh(); }} />
            <AddrListModal data={addrModal.data} visible={addrModal.show} onClose={() => { setAddrModal({ show: false, data: '' }); reFresh(); }} />
            <ImageViewer image={imageInfo.data} visible={imageInfo.show} onClose={() => { setImageInfo({ show: false, data: '' }) }} />
            {/* <ImageViewer image={'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3113&q=80'} visible={imageInfo.show} onClose={() => { setImageInfo({ show: false, data: '' }) }} /> */}
        </>
    );
};

const injectStore: [] = withStore('basic', 'WeiTuo', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(BuyWarehouseApp);
