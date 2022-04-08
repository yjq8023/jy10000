import React from 'react';
import router from './router/router';
import styles from './App.less';

function App() {
  return <div className={styles.app}>{router}</div>;
}

export default App;
