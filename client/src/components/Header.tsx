import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MeageulLogo from "../Icon/MaegeulLogo.png";
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
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-scampi-800 font-normal font-['Plus Jakarta Sans'] py-4 leading-normal">
        <div className="max-w-[calc(100%-300px)] mx-auto px-4 flex justify-between items-center">
          <Link to="/home" className="flex-shrink-0">
            <img src={MeageulLogo} alt="Maegeul Logo" className="h-12" />
          </Link>

          <nav className="flex-grow flex justify-center space-x-8">
            <Link to="/maegeul" className="nav-link">
              무드일기
            </Link>
            <Link to="/emotionForm" className="nav-link">
              AI 하루진단
            </Link>
            <Link to="/blog" className="nav-link">
              콘텐츠
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <AccountPopover
                data={[
                  {
                    label: "대시보드",
                    href: "/dashboard",
                    icon: (
                      <Iconify
                        width={22}
                        icon="solar:home-angle-bold-duotone"
                      />
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
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-violet-100 dark:bg-scampi-600 py-2 px-4 rounded-lg shadow-md
                hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors text-indigo-600 text-sm font-bold
                whitespace-nowrap"
              >
                로그아웃
              </button>
            ) : (
              <Link to="/mainlogin">
                <button
                  className="bg-violet-100 dark:bg-scampi-600 py-2 px-4 rounded-lg shadow-md
                  hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors text-indigo-600 hover:text-white text-sm font-extrabold
                  whitespace-nowrap"
                >
                  로그인
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Header;
