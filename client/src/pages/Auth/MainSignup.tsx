//client2/src/pages/Auth/MainLogin.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Apple from "../../Icon/Apple.png";
import Facebook from "../../Icon/Facebook.png";
import Google from "../../Icon/Google.png";
import Ticket from "../../Icon/Article Ticket.png";
import MeageulLogo from "../../Icon/Brand Logo_web ver. (v.1.0) (24.09.22) 1.png";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


const MainSignup = () => {
  const navigate = useNavigate();

  const handleEmailLoginClick = () => {
    navigate("/email-login");
  };

  const handleSignupClick = () => {
    navigate("/signupstep1");
  };

  const handleLogin = () => {
    window.location.href = `${BASE_URL}/auth/kakao`;
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
        <Link to="/home">
          <img
            src={MeageulLogo}
            alt="Maegeul Logo"
            className="w-[300px] justify-center items-center"
          />
          <h1 className="text-scampi-700 dark:text-scampi-300 text-5xl font-bold font-['DM Sans'] leading-10 inline-flex items-center cursor-pointer">
            MAEGEUL
          </h1>
        </Link>
        {/* Ticket 정보 */}
        <div className="w-[286px] h-[59px] rounded-lg border border-scampi-200 grid grid-cols-[1fr_3fr] items-center mt-5">
          <img src={Ticket} alt="Ticket Icon" className="w-14 h-14 mx-auto" />
          <div className="text-scampi-800">
            지금 가입하면{" "}
            <span className="text-indigo-600 font-bold">
              아티클 열람권 3회 티켓
            </span>
            을 받을 수 있어요!
          </div>
        </div>

        {/* 카카오 가입 버튼 */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleLogin}
            className="w-[400px] h-[59px] px-6 py-4 text-base text-white bg-scampi-600 rounded-full"
          >
            카카오로 3초만에 시작하기
          </button>
        </div>

        {/* 이메일 가입 버튼 */}
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={handleSignupClick}
            className="w-[400px] h-[59px] px-6 py-4 text-base text-white bg-scampi-600 rounded-full"
          >
            이메일로 시작하기
          </button>
        </div>

        {/* '또는' 구분선 */}
        <div className="w-full border-t border-gray-300 pt-4 mt-8 text-center text-scampi-700 dark:text-scampi-300">
          또는
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="flex gap-4 mt-5">
          <button className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <img src={Google} alt="Google" className="w-6 h-6" />
          </button>
          <button className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <img src={Apple} alt="Apple" className="w-6 h-6" />
          </button>
          <button className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* 로그인, 계정찾기, 비밀번호 찾기 */}
        <div className="flex items-center gap-4 mt-5">
          <button
            type="button"
            onClick={handleEmailLoginClick}
            className="text-scampi-500 dark:text-scampi-600 text-sm font-normal"
          >
            로그인
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

export default MainSignup;
