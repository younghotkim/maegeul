//client2/src/pages/Auth/MainLogin.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Apple from "../../Icon/Apple.png";
import Facebook from "../../Icon/Facebook.png";
import Google from "../../Icon/Google.png";
import KakaoIcon from "../../Icon/kakao_login.png.png";
import Email from "../../Icon/Email.png";

const MainLogin = () => {
  const navigate = useNavigate();

  const handleEmailLoginClick = () => {
    navigate("/email-login");
  };

  const handleSignupClick = () => {
    navigate("/mainsignup");
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/kakao";
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
        <Link to="/home">
          <h1 className="text-scampi-700 dark:text-scampi-300 text-5xl font-bold font-['DM Sans'] leading-10 text-center">
            MAEGEUL
          </h1>
          <h2 className="text-scampi-700 text-xl font-bold font-['DM Sans'] leading-10 text-center">
            매일 감정 글쓰기를 통해 만드는 단단한 나
          </h2>
        </Link>

        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className=" rounded-full mt-10  shadow-md  transition-color "
        >
          <img
            className="w-[300px] h-[60px] object-cover transition-color rounded-full"
            src={KakaoIcon}
            alt="Kakao Login Button"
          />
        </button>

        {/* 이메일 로그인 버튼 */}
        <button
          type="button"
          onClick={handleEmailLoginClick}
          className="bg-[#eaddff] text-scampi-700 w-[300px] h-[60px] rounded-full mt-4 text-2xl font-bold shadow-md transition-colors cursor-pointer hover:bg-scampi-700 hover:text-scampi-100 flex items-center justify-center"
        >
          <img src={Email} className="w-6 h-6 mr-11" />
          이메일 로그인
        </button>

        {/* '또는' 구분선 */}
        <div className="w-[400px] border-t border-gray-300 pt-4 mt-8 text-center text-scampi-700 dark:text-scampi-300">
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
