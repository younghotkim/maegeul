//client2/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MaeGeul from './pages/MaeGeul/Maeguel';
import AIWriting from './pages/AIWriting/AIWriting';
import Article from './pages/Archiving/Article';
import MgWriting from './pages/MaeGeul/MgWriting';
import EmotionForm from './components/EmotionForm';
import Mypage from './pages/Auth/Mypage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Logout from './pages/Auth/Logout';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maegeul" element={<MaeGeul />} />
        <Route path="/emotionForm" element={<EmotionForm />} />
        <Route path="/article" element={<Article />} />
        <Route path="/mgwriting" element={<MgWriting />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
