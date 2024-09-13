// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPurple from "../Icon/User Purple.png";
import pencilIcon from "../Icon/pencil logo purple.png";
import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const navigate = useNavigate();

  const { user, setUser } = useUser(); // UserContext에서 user 가져오기

  useEffect(() => {
    // 다크 모드 초기 설정 적용
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // `storage` 이벤트를 통해 다른 탭에서 토큰이 변경될 때 상태 업데이트
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("isDarkMode", newMode.toString());
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return newMode;
    });
  };

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 토큰 삭제 및 상태 업데이트
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 로그인 상태를 false로 설정
    setUser(null); // 사용자 정보를 초기화하여 profile_name 제거
    navigate("/"); // 로그아웃 후 메인 페이지로 리다이렉트
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full p-10 dark:bg-scampi-800">
      <Link to="/home">
        <button className="flex items-center text-xl bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors font-bold w-36 h-12 justify-center">
          <img src={pencilIcon} className="w-8 h-8 mr-2" alt="Pencil Icon" />{" "}
          {/* 아이콘 크기 조정 및 오른쪽 여백 추가 */}
          MAEGEUL
        </button>
      </Link>

      <nav className="flex gap-2">
        <Link to="/maegeul">
          <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full  hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            매일 글쓰기
          </button>
        </Link>
        <Link to="/emotionForm">
          <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full  hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            AI 하루진단
          </button>
        </Link>
        <Link to="/article">
          <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full  hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            추천 아티클
          </button>
        </Link>
      </nav>

      <nav className="flex gap-7 items-center">
        <button
          onClick={toggleDarkMode}
          className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
        >
          {isDarkMode ? "🔆" : "🌙"}
        </button>
        {isLoggedIn ? (
          <Link to="/mypage">
            <button className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
              <img
                className="inline-block w-[46px] h-[46px] rounded-full"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="Avatar"
              />
              <span className="ml-2">{user?.profile_name || "Guest"}</span>
            </button>
          </Link>
        ) : (
          <span className="text-sm text-scampi-700 dark:text-scampi-200">
            {user?.profile_name || "Guest"}
          </span>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
          >
            로그아웃
          </button>
        ) : (
          <Link to="/mainlogin">
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
