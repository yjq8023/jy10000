import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider, Spin } from 'antd';
import theme from '@/config/theme';
import zhCN from 'antd/lib/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import moment from 'moment';
import App from './App';
// import proxy from '@/services/proxy';
import '@/style/iconfont/iconfont.css';
// import 'antd/index.css';
import 'moment/locale/zh-cn';
import '@/services/mock';
import { isDev } from '@/utils';

// isDev && proxy();

moment.locale('zh-cn');

const loading = (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Spin size="large" style={{ margin: 'auto' }} />
  </div>
);
ReactDOM.render(
  <ConfigProvider theme={{ token: theme }} locale={zhCN}>
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
