import React, { FC, useState } from 'react'
import { ImageUploader, Space, Toast, Dialog, Modal } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
// import fetch from '@/utils/fetch';
import uploadFile from '@/utils/uploadFile';
import { servicePostUppayinfo } from '../services';

function sleep(n: any) {

    return new Promise((resolve) => {

        setTimeout(resolve, n);

    });

}
export const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'

export async function mockUpload2(file: File) {
    const token = localStorage.getItem('token') || '';
    var options = {
        headers: {},
        withCredentials: {},
        data: {
            token
        },
        file: file,
        filename: 'file',
        action: '/index.php/WebApi/File/upload',
        onProgress: (e: any) => {
            console.log('onProgress', e)
        },
        onSuccess: (res: any) => {

            console.log('onSuccess', res)

        },
        onError: (err: any) => {
            console.log('onError', err)
        }
    };
    var req = uploadFile(options);
    console.log('req', req?.response);
    console.log('req', req);

    await sleep(3000)
    return {
        url: URL.createObjectURL(file),
    }
}

export async function mockUploadFail() {
    await sleep(3000)
    throw new Error('Fail to upload')
}


// 限制图片数量
const LimitCount = (props: { oid: string;onClose:Function  }) => {
    const maxCount = 1
    const [fileList, setFileList] = useState<ImageUploadItem[]>([
    ])
const { onClose } = props;
    async function mockUpload(file: File) {
        const token = localStorage.getItem('token') || '';
        var options = {
            headers: {},
            withCredentials: {},
            data: {
                token
            },
            file: file,
            filename: 'file',
            action: '/index.php/WebApi/File/upload',
            onProgress: (e: any) => {
                console.log('onProgress', e)
            },
            onSuccess: (res: any) => {
                servicePostUppayinfo({ paypic: res.data, oid: props.oid })
                onClose();
                console.log('onSuccess', res)

            },
            onError: (err: any) => {
                console.log('onError', err)
            }
        };
        var req = uploadFile(options);
        console.log('req', req?.response);
        console.log('req', req);

        await sleep(3000)
        return {
            url: URL.createObjectURL(file),
        }
    }


    return (
        <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            multiple
            maxCount={1}
            showUpload={fileList.length < maxCount}
            onCountExceed={exceed => {
                Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
            }}
        />
    )
}

export default (props: { oid: string, visible: boolean; onClose:Function }) => {
    const { visible, oid, onClose } = props;
    const handleAction = (e:any) => {
        const { key, text } = e;
        const map:any = {
            close:onClose
        }
        map[key]&& map[key]()
    }
    return <Modal
        visible={visible}
        content={<div title='限制图片数量'>
            <Space direction='vertical'>
                <LimitCount oid={oid} onClose={onClose} />
            </Space>
        </div>}
        closeOnAction
        destroyOnClose
        onClose={() => {
        }}
        onAction={handleAction}
        actions={[
          {
            key: 'close',
            text: '关闭',
          },
        ]}
    >
    </Modal>


}