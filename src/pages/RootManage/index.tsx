import { Button, Form, Input, message, Select, } from 'antd';
import React, { useEffect, useState } from 'react';
import { serviceGetSid, servicePostOderBuy } from './services';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'

const RootManage = (props: any) => {
    const { getFieldDecorator, validateFields } = props.form;
    const [ shows, setShows ] = useState<any>([]);  

    const batchOrder = (opt:{showid:string, gids:string[] }) => {
        const { showid, gids } = opt;
        gids.forEach(gid => {
            servicePostOderBuy({showid, gid}).then(() => {
                message.success({
                    content:`gid:${gid}，结果：成功`,
                    duration:0,
                    onClose:()=>{}
                })
            }).catch((err:any) => {
                message.error({
                    content:`gid:${gid}，结果：失败，原因：${err}`,
                    duration:0,
                    onClose:()=>{}
                })
            })
        });
    }
    const hnadleSubmit1 = () => {
        validateFields((err: any, values: any) => {
            if (!err) {
                const { showid, gids } = values;
              const fGids  = gids.split(",");
              batchOrder({showid, gids:fGids})
            }
        });
    }

    useEffect(() => {

        serviceGetSid().then((d:any) => {
            const  { showings } = d;
            if(showings && Array.isArray(showings)){
                setShows(showings);
            }
        })
    },[])
    return <div style={{ padding: '40px' }}>
      
        <Form>
            <Form.Item label={'场次'}>
                {getFieldDecorator('showid', {
                    rules: [{ required: true, message: '请输入' }],
                })(
                    <Select>
                        {
                            shows.map((item:any) => {
                                const { sname, id, etime, stime } = item;
                                return   <Select.Option key={id} value={id}>{sname}：{stime}～{etime}</Select.Option>
                            })
                        }
                      
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={'商品ID,用英文逗号隔开'}>
                {getFieldDecorator('gids', {
                    rules: [{ required: true, message: '请输入' }],
                })(
                    <Input.TextArea rows={4} style={{ width: '80%' }}></Input.TextArea>
                )}
            </Form.Item>
        </Form>
        <Button onClick={hnadleSubmit1}>确定</Button>
    </div>
}


export default Form.create()(RootManage);
