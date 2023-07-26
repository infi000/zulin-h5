import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';
import { Button, CapsuleTabs, Card, Grid, Image, Modal, NavBar, Space } from 'antd-mobile';
import UploaderImgModal from './components/UploaderImgModal';
import View from './components/View';
import Styled from 'styled-components';
import { NAMESPACE } from './constants';
import { IProps } from './types';
import { LOGO } from '@/constants';
import PageWrap from '@/basic/PageWrap';
import SignatureCanvas from 'react-signature-canvas';
import { servicePostFile, servicePostReaded } from './services';

function savePicture(base64: string) {
  var arr = base64.split(',');
  var bytes = atob(arr[1]);

  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);

  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  var blob = new Blob([ab], { type: ' application/octet-stream' });

  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');

  a.href = url;

  a.download = new Date().valueOf + '.png';

  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent(
    'click',
    true,
    true,
    window,
    0,
    0,
    0,
    80,
    20,
    false,
    false,
    false,
    false,
    0,
    null,
  );
  a.dispatchEvent(evt);
  URL.revokeObjectURL(url);
}

const WrapBtn = Styled.div`
 
`;
const logoSrc = LOGO;

const SingatureApp = (props: IProps) => {
  const { type } = props;
  const history = useHistory();

  const [uploadModal, setUploadModal] = React.useState<any>({ show: false, data: '' });
  const sigCanvas = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    const dataurl = (sigCanvas as any).current.toDataURL('image/png');
    servicePostFile({ base64: dataurl }).then((d: any) => {
      servicePostReaded({ sign: d, }).then((d:any) => {
              
        Modal.alert({
          content: '签名成功',
          onConfirm: () => {
            handleBack();
          },
        })
    })


    })
    console.log(dataurl);
    // savePicture(dataurl);
  };
  const handleClean = () => {
    (sigCanvas as any)?.current?.clear();
  };

  const handleSend = () => {
    setUploadModal({ show: true, data: '' });
  };

  const handleBack = () => {
    history.goBack();
  };

  React.useEffect(() => {
    // var canvas:any = document.getElementById('canvas')
    // const e = new SignaturePad(canvas);
    // setSignaturePad(e)
  }, []);

  return (
    <PageWrap>
      <NavBar onBack={handleBack}>阅读协议 签名</NavBar>
      {
        type == 'sigature' && <> <Grid columns={4} gap={2} style={{ textAlign: 'center' }}>
          <Grid.Item span={2}>
            <Button style={{width:'100%'}} color='primary' onClick={handleClean} shape="rectangular">重写签名</Button>
          </Grid.Item>
          <Grid.Item span={2}>
            <Button style={{width:'100%'}} color='primary' onClick={handleClick} shape="rectangular">上传</Button>
          </Grid.Item>
          {/* <Grid.Item>
          <Button onClick={handleSend} shape="rectangular">上传签名</Button>
        </Grid.Item> */}
        </Grid>
        <Card>
        <SignatureCanvas
            penColor="black"
            canvasProps={{ width: '400', height: '400', className: 'sigCanvas' }}
            ref={sigCanvas}
          />
          
        </Card>
 
        </>
      }

      {
        type == 'view' && <View />
      }


      <UploaderImgModal
        oid={uploadModal.data}
        visible={uploadModal.show}
        onClose={() => {
          setUploadModal({ show: false, data: '' });
          handleBack();
        }}
      />
    </PageWrap>
  );
};

const injectStore: [] = withStore('basic', NAMESPACE);

export default compose<any>(withRouter, connect(...injectStore))(SingatureApp);
