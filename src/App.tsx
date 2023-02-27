import React from 'react';
import RenderRoutes from './router/router';
import styles from './App.less';

function App() {
  return (
    <div className={styles.app}>
      <RenderRoutes />
    </div>
  );
}

export default App;
