// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../Icon/User.svg';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // 초기 다크 모드 설정을 로컬 스토리지에서 가져옴
    return localStorage.getItem('isDarkMode') === 'true';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 사용자가 로그인되어 있는지 확인
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 토큰이 존재하면 로그인 상태로 설정

    // 초기 다크 모드 설정 적용
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // 로컬 스토리지에 다크 모드 상태 저장
      localStorage.setItem('isDarkMode', newMode.toString());

      // 다크 모드 클래스 적용 또는 제거
      if (newMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      return newMode;
    });
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
        <Link to="/mypage"> {/* Link 컴포넌트로 UserIcon을 감싸 클릭 시 Mypage로 이동 */}
          <button className="w-8 h-8 p-1 bg-transparent border-0 dark:text-scampi-200">
            <UserIcon className="w-full h-full fill-current" />
          </button>
        </Link>
        {isLoggedIn ? (
          <Link to="/logout">
            <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
              로그아웃
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
              로그인
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
