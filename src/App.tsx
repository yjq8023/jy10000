import React, { Suspense } from 'react';
import router from './router'
import './App.css';

function App() {
  const loading = <div>Loading ...</div>
  return (
    <div className="App">
      <Suspense fallback={loading}>
        {router}
      </Suspense>
    </div>
  );
}

export default App;
