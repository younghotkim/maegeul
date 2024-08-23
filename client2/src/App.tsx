//client2/src/App.tsx
import React from 'react';
import Diag from './pages/Diag';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div>
      <Home />
      <Diag />
    </div>
  );
};

export default App;
