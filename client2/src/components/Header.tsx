// src/components/Header.tsx
import React, { useState } from 'react';

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
    <header className="sticky top-0 z-50 flex justify-between items-center w-full p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <div className="text-2xl text-gray-700 dark:text-white font-semibold">📂 MAEGEUL LOGO</div>
      <nav className="flex gap-6">
        <a href="#" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400 hover:underline transition-colors">홈</a>
        <a href="#" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400 hover:underline transition-colors">글쓰기</a>
        <a href="#" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400 hover:underline transition-colors">아티클</a>
        <a href="#" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-400 hover:underline transition-colors">지난 글 보기</a>
      </nav>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-700 dark:bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-500 dark:hover:bg-gray-600 transition-colors">
        {isDarkMode ? '🔆' : '🌙'}
      </button>
      <button className="bg-gray-700 dark:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors">
            로그인
          </button>
    </header>
  );
};

export default Header;
