// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center w-full p-4 bg-gray-100 shadow-md">
      <div className="text-2xl text-gray-700 font-semibold">📂 MAEGEUL LOGO</div>
      <nav className="flex gap-6">
        <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">홈</a>
        <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">글쓰기</a>
        <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">아티클</a>
        <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">지난 글 보기</a>
      </nav>
      <button className="bg-gray-700 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 transition-colors">My</button>
    </header>
  );
};

export default Header;
