import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pencilIcon from "../Icon/pencil logo purple.png";
import { useUser } from "../context/UserContext";

import { AccountPopover } from "../layouts/components/account-popover";
import { Iconify } from "../dashboardComponents/iconify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

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

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 토큰 삭제 및 상태 업데이트
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 로그인 상태를 false로 설정
    setUser(null); // 사용자 정보를 초기화하여 profile_name 제거
    navigate("/"); // 로그아웃 후 메인 페이지로 리다이렉트
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 메뉴 표시 여부

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // 드롭다운 표시/숨기기 토글
  };

  // 외부 클릭 시 드롭다운을 닫는 기능 추가
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#profileButton")) {
      setDropdownVisible(false); // 프로필 버튼 외부를 클릭하면 드롭다운을 닫음
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible]);

  // 다크 모드 토글 함수
  const DarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 다크 모드 및 라이트 모드 테마 생성
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className="sticky top-0 z-50 flex justify-between items-center w-full p-5 bg-slate-50 dark:bg-scampi-800">
        <Link to="/home">
          <button className="flex items-center bg-transparent  text-indigo-950 text-l font-extrabold font-['Ubuntu Sans'] dark:text-scampi-200 py-2 px-4 rounded-full hover:bg-scampi-200 dark:hover:bg-scampi-700 cursor-pointer transition-colors font-bold w-36 h-12 justify-center">
            <img src={pencilIcon} className="w-8 h-8 mr-2" alt="Pencil Icon" />{" "}
            MAEGEUL
          </button>
        </Link>

        <nav className="flex gap-2">
          <Link to="/maegeul">
            <button className=" text-black text-sm font-normal font-['Plus Jakarta Sans'] leading-normal py-2 px-4 rounded-full hover:bg-scampi-200  cursor-pointer transition-colors">
              무드일기
            </button>
          </Link>
          <Link to="/emotionForm">
            <button className=" text-black text-sm font-normal font-['Plus Jakarta Sans'] leading-normal py-2 px-4 rounded-full hover:bg-scampi-200  cursor-pointer transition-colors">
              AI 하루진단
            </button>
          </Link>
          <Link to="/blog">
            <button className=" text-black text-sm font-normal font-['Plus Jakarta Sans'] leading-normal py-2 px-4 rounded-full hover:bg-scampi-200  cursor-pointer transition-colors">
              콘텐츠
            </button>
          </Link>
        </nav>

        <nav className="flex gap-7 items-center">
          {isLoggedIn ? (
            // AccountPopover
            <AccountPopover
              data={[
                {
                  label: "대시보드",
                  href: "/dashboard",
                  icon: (
                    <Iconify width={22} icon="solar:home-angle-bold-duotone" />
                  ),
                },
                {
                  label: "다크모드",
                  href: "#",
                  icon: (
                    <Iconify
                      width={22}
                      icon="solar:shield-keyhole-bold-duotone"
                      onClick={DarkMode}
                    />
                  ),
                },
                {
                  label: "회원정보수정",
                  href: "#",
                  icon: (
                    <Iconify width={22} icon="solar:settings-bold-duotone" />
                  ),
                },
              ]}
            />
          ) : null}

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
    </ThemeProvider>
  );
};

export default Header;
