//client2/src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MeageulLogo from "../Icon/Brand Logo_web ver. (v.1.0) (24.09.22) 1.png";
import { AccountPopover } from "../layouts/components/account-popover";
import { Iconify } from "../dashboardComponents/iconify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useUser } from "../context/UserContext";
import Modal from "./Modal";
import Logo from "../logo/main_logo.png";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

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
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
      <header className="sticky top-0 z-50 w-full text-blue-950 bg-white dark:bg-gray-950 font-bold font-plus-jakarta-sans py-4 leading-normal">
        <div className="max-w-[1140px] mx-auto flex justify-between items-center text-sm">
          <Link to="/home" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-[35px] h-[35px]" />
            <div className="title inline text-blue-950 dark:text-white text-[24.01px] font-extrabold leading-[28.81px] tracking-[0.22em]">
              maegeul
            </div>
          </Link>

          <nav className="flex-grow flex justify-center space-x-12 text-sm text-blue-950 dark:text-gray-300 tracking-wide">
            {/* 무드일기 링크 - 로그인 상태일 때만 활성화 */}
            {isLoggedIn ? (
              <Link to="/maegeul" className="nav-link">
                무드 일기
              </Link>
            ) : (
              <span
                className="nav-link cursor-pointer"
                onClick={() =>
                  openModal("무드 일기는 로그인 후 이용 할 수 있어요.")
                }
              >
                무드 일기
              </span>
            )}

            {isLoggedIn ? (
              <Link to="/MgWriting" className="nav-link">
                AI 하루진단
              </Link>
            ) : (
              <span
                className="nav-link cursor-pointer"
                onClick={() =>
                  openModal("AI하루진단은 로그인 후 이용 할 수 있어요.")
                }
              >
                AI 하루진단
              </span>
            )}

            {isLoggedIn ? (
              <Link to="/dashboard" className="nav-link">
                마이매글
              </Link>
            ) : (
              <span
                className="nav-link cursor-pointer"
                onClick={() =>
                  openModal("마이매글은 로그인 후 이용 할 수 있어요.")
                }
              >
                마이매글
              </span>
            )}
          </nav>

          {/* Modal 컴포넌트 사용 */}
          <Modal
            isOpen={isModalOpen}
            message={modalMessage}
            onClose={closeModal}
          />

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
                      label: "다크모드",
                      href: "#",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:shield-keyhole-bold-duotone"
                        />
                      ),
                      onclick: DarkMode, // 여기서 DarkMode 함수를 전달
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
                  className="bg-violet-100 hover:bg-violet-300 dark:bg-scampi-600 py-2 px-4 rounded-lg shadow-md
                     dark:hover:bg-scampi-700 transition-colors text-indigo-600 text-sm font-extrabold
                      whitespace-nowra"
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
                    className="bg-violet-100 hover:bg-violet-300 dark:bg-scampi-600 py-2 px-4 rounded-lg shadow-md
                     dark:hover:bg-scampi-700 transition-colors text-indigo-600 text-sm font-extrabold
                      whitespace-nowra"
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
