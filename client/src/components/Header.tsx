//client2/src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MeageulLogo from "../Icon/Brand Logo_web ver. (v.1.0) (24.09.22) 1.png";
import { AccountPopover } from "../layouts/components/account-popover";
import { Iconify } from "../dashboardComponents/iconify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return sessionStorage.getItem("isDarkMode") === "true";
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!sessionStorage.getItem("token");
  });

  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!sessionStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const DarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-scampi-800 font-normal font-plus-jakarta-sans py-4 leading-normal">
        <div className="max-w-[1140px] mx-auto flex justify-between items-center text-sm">
          <Link to="/home" className="flex-shrink-0">
            <img src={MeageulLogo} alt="Maegeul Logo" className="w-[150px]" />
          </Link>

          <nav className="flex-grow flex justify-center space-x-8">
            {/* 무드일기 링크 - 로그인 상태일 때만 활성화 */}
            {isLoggedIn ? (
              <Link to="/maegeul" className="nav-link">
                무드일기
              </Link>
            ) : (
              <span className="nav-link text-gray-400 cursor-not-allowed">
                무드일기
              </span>
            )}

            {/* AI 진단 가이드 링크 - 로그인 상태일 때만 활성화 */}
            {isLoggedIn ? (
              <Link to="#" className="nav-link">
                AI 진단 가이드
              </Link>
            ) : (
              <span className="nav-link text-gray-400 cursor-not-allowed">
                AI 진단 가이드
              </span>
            )}

            {/* 추천 콘텐츠 링크 - 로그인 상태일 때만 활성화 */}
            {isLoggedIn ? (
              <Link to="/contents" className="nav-link">
                추천 콘텐츠
              </Link>
            ) : (
              <span className="nav-link text-gray-400 cursor-not-allowed">
                추천 콘텐츠
              </span>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <AccountPopover
                  data={[
                    {
                      label: "마이매글",
                      href: "/dashboard",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:home-angle-bold-duotone"
                        />
                      ),
                    },
                    {
                      label: "알림 설정",
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
                        <Iconify
                          width={22}
                          icon="solar:settings-bold-duotone"
                        />
                      ),
                    },
                  ]}
                />
                <button
                  onClick={handleLogout}
                  className="bg-violet-100 dark:bg-scampi-600 py-2 px-4 rounded-lg
                   dark:hover:bg-scampi-700 transition-colors text-indigo-600 text-sm font-bold
                    whitespace-nowrap"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/mainlogin">
                  <button
                    className=" dark:bg-scampi-600 py-2 px-4 rounded-lg 
                     dark:hover:bg-scampi-700 transition-colors
                      whitespace-nowrap"
                  >
                    로그인
                  </button>
                </Link>
                <Link to="/mainsignup">
                  <button
                    className="bg-violet-100 dark:bg-scampi-600 py-2 px-4 rounded-lg shadow-md
                     dark:hover:bg-scampi-700 transition-colors text-indigo-600 text-sm font-extrabold
                      whitespace-nowrap"
                  >
                    회원가입
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Header;
