// src/components/Header.tsx
// SVG 파일을 React 컴포넌트로 임포트
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../Icon/User.svg';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full p-4 bg-scampi-100 dark:bg-scampi-800 shadow-md">
      <Link to="/home">
        <button className="text-xl bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors font-semibold">
          📂 MAEGEUL LOGO
        </button>
      </Link>

      <nav className="flex gap-2">
        <Link to="/maegeul">
          <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            매일 글쓰기
          </button>
        </Link>
        <Link to="/emotionForm">
          <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            AI 하루진단
          </button>
        </Link>
        <Link to="/article">
          <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            추천 아티클
          </button>
        </Link>
      </nav>

      <nav className="flex gap-2 items-center">
        <button
          onClick={toggleDarkMode}
          className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
          {isDarkMode ? '🔆' : '🌙'}
        </button>
        <UserIcon className="w-8 h-8 fill-current text-scampi-700 dark:text-scampi-200" />
        <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
          로그인
        </button>
      </nav>
    </header>
  );
};

export default Header;
