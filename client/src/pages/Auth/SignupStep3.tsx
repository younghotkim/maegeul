//client2/src/pages/Auth/Signup3.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pencil from "../../Icon/Pencil.png";

const SignupStep3: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5 dark:bg-gray-800">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-900 relative">
        {/* Step 3 Header */}
        <h2 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">
          STEP 3
        </h2>
        {/*  구분선 */}
        <div className="w-full border-t-8 border-scampi-500 pt-4 mt-8 text-center text-scampi-700 dark:text-scampi-300"></div>
        <h3 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">
          회원가입 완료
        </h3>

        {/* 텍스트 섹션 */}
        <div className="mt-20">
          <div className="text-lg text-center text-scampi-800 font-bold font-['DM Sans'] leading-tight">
            회원가입이 완료되었습니다.
            <br />
            글쓰기를 통해 나를 단단하게 할 준비가 되셨나요?
          </div>
          <img
            src={Pencil}
            alt="Pencil Icon"
            className="w-5 h-5 mx-auto mt-10"
          />
        </div>

        {/* 완료 버튼 */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          <Link to="/home">
            <button className="w-full h-10 text-base font-bold text-scampi-600 border border-scampi-600 rounded-3xl">
              홈으로 가기
            </button>
          </Link>

          <Link to="/mainlogin">
            <button className="w-full h-10 text-base font-bold text-white bg-scampi-600 rounded-3xl">
              로그인 화면으로 가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupStep3;
