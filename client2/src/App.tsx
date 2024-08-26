//client2/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MaeGeul from './pages/MaeGeul/Maeguel';
import AIWriting from './pages/AIWriting/AIWriting';
import MyDiary from './pages/MyDiary/MyDiary';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maegeul" element={<MaeGeul />} />
        <Route path="/aiwriting" element={<AIWriting />} />
        <Route path="/mydiary" element={<MyDiary />} />
      </Routes>
    </Router>
  );
};

export default App;
