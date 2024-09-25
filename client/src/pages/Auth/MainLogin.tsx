//client2/src/pages/Auth/MainLogin.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Apple from "../../Icon/Apple.png";
import Facebook from "../../Icon/Facebook.png";
import Google from "../../Icon/Google.png";
import KakaoIcon from "../../Icon/kakao_login.png.png";
import Email from "../../Icon/Email.png";
import MeageulLogo from "../../Icon/Brand Logo_web ver. (v.1.0) (24.09.22) 1.png";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const MainLogin = () => {
  const navigate = useNavigate();

  const handleEmailLoginClick = () => {
    navigate("/email-login");
  };

  const handleSignupClick = () => {
    navigate("/mainsignup");
  };

  const handleLogin = async () => {
    try {
      window.location.href = `${BASE_URL}/auth/kakao`; // 카카오 인증 요청
    } catch (error) {
      console.error("카카오 로그인 요청 실패:", error);
    }
  };

  // 백엔드에서 리다이렉트된 후 토큰과 사용자 정보를 받아서 처리하는 함수
  const handleKakaoCallback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/kakao/callback`); // 카카오 콜백 요청

      if (response.data && response.data.token) {
        const { token, user } = response.data;

        // 토큰 저장
        sessionStorage.setItem("token", token);

        // UserContext에 사용자 정보 저장 (useUser 훅 사용)
        setUser({
          userId: user.userId, // 반환된 userId 저장
          profile_name: user.profileName,
          profile_picture: user.profilePicture,
        });

        navigate("/"); // 로그인 후 메인 페이지로 리다이렉트
      }
    } catch (error) {
      console.error("카카오 콜백 처리 오류:", error);
    }
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
          <h2 className="text-scampi-700 text-xl font-bold font-plus-jakarta-sans leading-10 text-center">
            매일 감정 글쓰기를 통해 만드는 단단한 나
          </h2>
        </Link>

        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className=" rounded-full mt-10  shadow-md  transition-color hover:shadow-lg"
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
          className="w-[300px] h-[60px] rounded-full mt-4 shadow-md transition-colors cursor-pointer  
                     bg-indigo-700 text-white hover:bg-white hover:text-indigo-700 overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center">
            <img src={Email} className="w-6 h-6 mr-10" alt="Email icon" />
            <span
              className="text-xl ml-5 mr-10 font-bold font-plus-jakarta-sans 
                             group-hover:text-scampi-100"
            >
              이메일 로그인
            </span>
          </div>
        </button>

        {/* '또는' 구분선 */}
        <div className="w-[300px] flex items-center mt-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-scampi-700 dark:text-scampi-300">
            또는
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
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
        {/* 하단 부분 */}
        <div className=" text-center text-slate-500 text-sm font-medium font-plus-jakarta-sans leading-loose">
          © 2024, Maegeul Team. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default MainLogin;
function setUser(arg0: {
  userId: any; // 반환된 userId 저장
  profile_name: any;
  profile_picture: any;
}) {
  throw new Error("Function not implemented.");
}
