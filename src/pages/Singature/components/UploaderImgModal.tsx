import React, { FC, useState } from 'react'
import { ImageUploader, Space, Toast, Dialog, Modal } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
// import fetch from '@/utils/fetch';
import uploadFile from '@/utils/uploadFile';
import { servicePostReaded } from '../services';

function sleep(n: any) {

    return new Promise((resolve) => {

        setTimeout(resolve, n);

    });

}


// 限制图片数量
const LimitCount = (props: { oid: string; onClose: Function }) => {
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
                servicePostReaded({ sign: res.data, }).then((d:any) => {
              
                    Toast.show({
                        content: d
                    })
                    onClose();
                })
        
      
                console.log('onSuccess', res)

            },
            onError: (err: any) => {
                console.log('onError', err)
            }
        };
        var req = uploadFile(options);
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

export default (props: { oid: string, visible: boolean; onClose:()=>void }) => {
    const { visible, oid, onClose } = props;
    const handleAction = (e: any) => {
        const { key, text } = e;
        const map: any = {
            close: onClose
        }
        map[key] && map[key]()
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
        onClose={()=>{}}
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