//client2/src/pages/Auth/EmailLogin.tsx
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import MeageulLogo from "../../Icon/Brand Logo_web ver. (v.1.0) (24.09.22) 1.png";

const EmailLogin = () => {
  return (
    <>
      {/* 상단 광고 줄 */}
      <div className="font-plus-jakarta-sans flex items-center justify-between w-full bg-violet-400 p-1">
        <Link to="/home" className="flex-shrink-0">
          <img src={MeageulLogo} alt="Maegeul Logo" className="w-[150px]" />
        </Link>
        <div className="text-scampi-200">
          꾸준히 감정일기를 작성하면 나에게 맞는 콘텐츠를 추천받을 확률이
          높아져요!
        </div>
        <Link to="/article">
          <button className="text-sm bg-transparent text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 hover:bg-scampi-600 hover:text-white dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            콘텐츠 탐색
          </button>
        </Link>
      </div>

      {/* 이메일 로그인 페이지 */}
      <div className="font-plus-jakarta-sans grid grid-cols-2 h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
        {/* 텍스트 영역 */}
        <div className="flex flex-col justify-center p-8 text-left">
          <h2 className="text-4xl font-extrabold mb-4 text-scampi-700">
            이메일 로그인하기
          </h2>
          <p className="text-sm left text-scampi-600 leading-6 mb-10">
            회원가입 시에 입력했던 이메일 주소와 비밀번호를 입력해 주세요.
            <br /> 만약 이메일 주소나 비밀번호가 기억나지 않는다면 아래의 계정
            찾기 버튼을 통해 확인 후 로그인할 수 있어요.
          </p>
          <p className="text-sm font-semibold text-scampi-500 mb-10">
            회원가입 정보가 기억나지 않는다면?
          </p>
          <div className="flex space-x-10">
            <Link
              to="#"
              className="text-scampi-500 hover:text-scampi-700 transition-colors duration-300"
            >
              자동 로그인
            </Link>
            <Link
              to="#"
              className="text-scampi-500 hover:text-scampi-700 transition-colors duration-300"
            >
              계정 찾기
            </Link>
            <Link
              to="#"
              className="text-scampi-500 hover:text-scampi-700 transition-colors duration-300"
            >
              비밀번호 재설정
            </Link>
          </div>
        </div>

        {/* 로그인 폼 영역 */}
        <div className="flex items-center justify-center ">
          <div className="w-[463px] h-[481px] items-center justufy-center rounded-xl bg-violet-800">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailLogin;
