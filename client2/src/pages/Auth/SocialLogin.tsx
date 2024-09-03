//client2/src/pages/Auth/SocialLogin.tsx
import React from 'react';
import KakaoLogin from 'react-kakao-login';
import kakaoIcon from '../../Icon/kakao_login.png.png';

const SocialLogin = () => {
  const kakaoSuccess = (response: any) => {
    console.log('카카오 로그인 성공:', response);
  };

  const kakaoFailure = (error: any) => {
    console.error('카카오 로그인 실패:', error);
  };

  return (
<div className="flex flex-col items-center">
  <h1 className="text-xl text-scampi-600 mb-5">간편 로그인</h1>
  <KakaoLogin
    token={process.env.REACT_APP_KAKAO_ID || ""}
    onSuccess={kakaoSuccess}
    onFail={kakaoFailure}
    onLogout={console.info}
    render={(props: any) => (
      <button
        onClick={props.onClick}
        className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
        <img src={kakaoIcon} alt="카카오 로그인" />
      </button>
    )}
  />
</div>

  );
};

export default SocialLogin;