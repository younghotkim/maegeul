//client2/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MaeGeul from './pages/MaeGeul/Maeguel';
import AIWriting from './pages/AIWriting/AIWriting';
import Article from './pages/Archiving/Article';
import MgWriting from './pages/MaeGeul/MgWriting';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maegeul" element={<MaeGeul />} />
        <Route path="/aiwriting" element={<AIWriting />} />
        <Route path="/article" element={<Article />} />
        <Route path="/mgwriting" element={<MgWriting />} />
      </Routes>
    </Router>
  );
};

export default App;
