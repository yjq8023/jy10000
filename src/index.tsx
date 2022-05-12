import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import '@sinohealth/butterfly-ui-antd/dist/@sinohealth/butterfly-ui-antd.css';
import '@sinohealth/butterfly-ui-components/lib/index.css';
import '@/style/iconfont/iconfont.css';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
