//client2/src/pages/Auth/MainLogin.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Apple from "../../Icon/Apple.png";
import Facebook from "../../Icon/Facebook.png";
import Google from "../../Icon/Google.png";
import KakaoIcon from "../../Icon/kakao_login.png.png";

const MainLogin = () => {
  const navigate = useNavigate();

  // 이메일 로그인 버튼 클릭 시 이동 함수
  const handleEmailLoginClick = () => {
    navigate("/email-login");
  };

  // 회원가입 버튼 클릭 시 이동
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/kakao";
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
        <h1 className="text-scampi-700 dark:text-scampi-300 text-5xl font-bold font-['DM Sans'] leading-10 inline-flex items-center cursor-pointer">
          <Link to="/home">MAEGEUL</Link>
        </h1>

        {/* 카카오 로그인 버튼 */}
        <button onClick={handleLogin} className="w-[486px] h-[73px]">
          <img
            className="w-full h-full object-cover"
            src={KakaoIcon}
            alt="Kakao Login Button"
          />
        </button>

        {/* 이메일 로그인 버튼 */}
        <button
          type="button"
          onClick={handleEmailLoginClick}
          className="bg-[#eaddff] text-scampi-700 w-[486px] h-[73px] rounded-full mt-4 text-base font-semibold shadow-md transition-colors"
        >
          이메일 로그인
        </button>

        {/* 소셜 로그인 버튼들 */}
        <div className="flex gap-4 mt-5">
          <button className="flex justify-center items-center rounded-full p-2 border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <img src={Google} alt="Google" className="w-6 h-6" />
          </button>
          <button className="flex justify-center items-center rounded-full p-2 border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <img src={Apple} alt="Apple" className="w-6 h-6" />
          </button>
          <button className="flex justify-center items-center rounded-full p-2 border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* 회원가입, 계정찾기, 비밀번호 찾기 */}
        <div className="flex items-center gap-4 mt-5">
          <button
            type="button"
            onClick={handleSignupClick}
            className="text-scampi-500 dark:text-scampi-600 text-sm font-normal"
          >
            회원 가입
          </button>
          <span className="text-scampi-400 dark:text-scampi-600">|</span>
          <button className="text-scampi-500 dark:text-scampi-600 text-sm font-normal">
            계정 찾기
          </button>
          <span className="text-scampi-400 dark:text-scampi-600">|</span>
          <button className="text-scampi-500 dark:text-scampi-600 text-sm font-normal">
            비밀번호 찾기
          </button>
        </div>
      </div>

      {/* 하단 부분 */}
      <div className="flex flex-col w-full h-16 justify-center items-center bg-black text-scampi-200">
        Copyright © 2024 MAEGEUL | All Rights Reserved
      </div>
    </>
  );
};

export default MainLogin;
