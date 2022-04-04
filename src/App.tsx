import React, { Suspense } from 'react';
import router from './router/router';
import styles from './App.less';

function App() {
  const loading = <div>Loading ...</div>;
  return (
    <div className={styles.app}>
      <Suspense fallback={loading}>
        {router}
      </Suspense>
    </div>
  );
}

export default App;
