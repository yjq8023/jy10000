import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider, Spin } from '@sinohealth/butterfly-ui-components/lib';
import zhCN from '@sinohealth/butterfly-ui-antd/lib/locale/zh_CN';
import moment from 'moment';
import App from './App';
import Empty from '@/components/Empty';
import '@sinohealth/butterfly-ui-antd/dist/@sinohealth/butterfly-ui-antd.css';
import '@sinohealth/butterfly-ui-components/lib/index.css';
import '@/style/iconfont/iconfont.css';
import 'moment/locale/zh-cn';

import Editor from '@/pages/formily/editor';

moment.locale('zh-cn');

const loading = (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Spin size="large" style={{ margin: 'auto' }} />
  </div>
);
ReactDOM.render(
  <ConfigProvider locale={zhCN} renderEmpty={Empty}>
    <RecoilRoot>
      <Suspense fallback={loading}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  </ConfigProvider>,
  document.getElementById('root'),
);
