/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './pages/H5demo/index';
import App from './App';
import 'babel-polyfill';
import { getParamsFromUrl, setCookie} from '@/utils/utils';
// import 'antd-mobile/es/global'
// import 'antd-mobile/dist/annpm run td-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
// import  "antd-mobile/bundle/style.css";
// import './assets/style/index.css';

const { openid } = getParamsFromUrl();

setCookie('openid', openid);

const render = (Root) => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}