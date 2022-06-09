import React from 'react';
import { registerComponents } from '@sinohealth/butterfly-formily-engine';
import * as components from '@sinohealth/butterfly-formily-components';
import router from './router/router';
import styles from './App.less';
import '@sinohealth/butterfly-formily-components/lib/index.css';

registerComponents(components);
function App() {
  return <div className={styles.app}>{router}</div>;
}

export default App;
