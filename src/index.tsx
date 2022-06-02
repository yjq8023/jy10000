import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from '@sinohealth/butterfly-ui-antd';
import zhCN from '@sinohealth/butterfly-ui-antd/lib/locale/zh_CN';
import App from './App';
import '@sinohealth/butterfly-ui-antd/dist/@sinohealth/butterfly-ui-antd.css';
import '@sinohealth/butterfly-ui-components/lib/index.css';
import '@/style/iconfont/iconfont.css';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
