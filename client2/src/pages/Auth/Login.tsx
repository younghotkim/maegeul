//client2/src/pages/Auth/Login.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import Apple from "../../Icon/Apple.png";
import Facebook from "../../Icon/Facebook.png";
import Google from "../../Icon/Google.png";
import ArticleIcon from "../../Icon/Article Ticket.png";

const Login = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  // 이메일 로그인 버튼 클릭 시 이동 함수
  const handleEmailLoginClick = () => {
    navigate("/email-login"); // '/email-login' 경로로 바로 이동합니다.
  };

  return (
    <>
      {/* 메인 로그인 페이지 */}
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
        <h1 className="text-scampi-700 dark:text-scampi-300 text-5xl font-bold font-['DM Sans'] leading-10 inline-flex items-center cursor-pointer">
          <Link to="/home">MAEGEUL</Link>
        </h1>
        <div className="grid grid-cols-2 border border-gray-300 HeadingH3 w-400 bg-slate-50 rounded-2xl text-left mt-10 mb-10">
          <div>
            <img src={ArticleIcon} alt="Ticket" className="w-20 h-20" />
          </div>
          <div className="grid grid-cols-1 text-left">
            <span className="text-slate-500 text-l font-normal font-['DM Sans'] leading-6">
              지금 가입하면{" "}
            </span>
            <span className="text-indigo-600 text-l font-normal font-['DM Sans'] leading-4">
              아티클 열람권 3회 티켓
            </span>
            <span className="text-slate-500 text-l font-normal font-['DM Sans'] leading-4">
              을 받을 수 있어요!
            </span>
          </div>
        </div>

        {/* 로그인 유도 버튼 */}
        <button
          type="button"
          onClick={handleEmailLoginClick} // 이메일 로그인 클릭 시 페이지 이동 함수 호출
          className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
        >
          이메일로 시작하기
        </button>

        <SocialLogin></SocialLogin>

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
      </div>

      {/* 하단 부분 */}
      <div className="flex flex-col w-full h-16 justify-center items-center bg-black text-scampi-200">
        Copyright © 2024 MAEGEUL | All Rights Reserved
      </div>
    </>
  );
};

export default Login;
