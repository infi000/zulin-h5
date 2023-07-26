import * as React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import { useState, useEffect } from 'react';
import random from 'lodash/random';
import { API_HOST } from '@/constants';


const NUpload = (props: any) => {

  const { initialValue = [] } = props['data-__meta'];
  const [fileList, setFileList]: [any, any] = useState([]);

  const { value, onChange, max } = props;
  console.log('props.value', props);
  console.log('fileList', fileList);

  const triggerChange = (fileListData: any[]) => {
    let format = [];
    format = ([...fileListData].length > 0) ? [...fileListData].map(item => item.url) : [];
    console.log(format);
    console.log('fileListData', fileListData);
    onChange(format);
    setFileList([...fileListData]);
  };
  // 上传之前
  const beforeUpload = (file: any) => {
    if (fileList.length > (max - 1)) {
      message.error(`最多支持上传${max}个附件!`);
      return false;
    }
    // const isLt = file.size / 1024 / 1024 < fileSize;
    // // 检查文件大小
    // if (!isLt) {
    //   message.error(`文件大小不得超过${fileSize}MB!`);
    //   return false;
    // }
    return true;
  };

  // 上传onChange
  const uploadOnChange = (info: any) => {
    let fileListData: any = [...info.fileList];
    // 上传错误时提示
    if (info.file.status === 'error' || !info.file.status) {
      message.error(`文件${info.file.name}上传失败！`);
      fileListData = [...fileListData].reduce((res, file) => {
        if (file.uid !== info.file.uid) {
          res.push({ ...file });
        }
        return res;
      }, []);
    }
    if (info.file.status === 'done') {
      console.log('info.file.======>', info.file);
      if ((Array.isArray(info.file.response.result) && info.file.response.result.length === 0) || info.file.response.res !== 'succ') {
        message.error(`${info.file.response.errmsg}！【logId: ${info.file.response.log_id}】`);
        fileListData = [...fileListData].reduce((res, file) => {
          if (file.uid !== info.file.uid) {
            res.push({ ...file });
          }
          return res;
        }, []);
      } else {
        message.success(`文件${info.file.name}上传成功！`);
        fileListData = [...fileListData].map((file: any) => {
          if (file.response && file.response.res === 'succ') {
            const newFile = { ...file, url: `${file.response.data}` };
            return newFile;
          }
          return file;``
        });
      }
    }
    triggerChange(fileListData);
    // 设置file及file下载url
  };


    // 移除删掉的文件
    const uploadOnRemove = (file: any) => new Promise((resolve) => {
      triggerChange([]);
      resolve(true);
    });

    

  useEffect(() => {
    if (initialValue && Array.isArray(initialValue)) {
      const format = initialValue.map((item: any | { url: string;[key: string]: string }, index: number) => {
        const status = 'done'; const response = { status: 'success' }; const uid = random(0, 100000000);
        let name: any = ''; let url:any = ''; let ecpItem = {};
        if (item instanceof Object) {
          name = `附件${index + 1}`;
          url = item;
        } else {
          name = `附件${index + 1}`;
          url = item.url;
          ecpItem = { ...item };
        }
        return {
          ...ecpItem, uid, name, status, response, url,
        };
      });
      setFileList((opt: any) => [...format, ...opt]);
    }
  }, [JSON.stringify(initialValue)]);

  return (
    <Upload
      beforeUpload={beforeUpload}
      name='file'
      action={API_HOST + '/index.php/WebApi/File/upload'}
      fileList={fileList}
      listType= 'picture'
      onChange={uploadOnChange}
      withCredentials
      onRemove={uploadOnRemove as any}
    >
      <Button>
        <Icon type='upload' /> Click to Upload
      </Button>
    </Upload>
  );
};

// export default React.forwardRef(NUpload);
export default NUpload;
