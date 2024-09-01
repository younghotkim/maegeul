import React from 'react';
// import KakaoLogin from 'react-kakao-login';

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
      {/* <KakaoLogin
        token="<카카오 앱 REST API 키 넣기>"
        onSuccess={kakaoSuccess}
        onFail={kakaoFailure}
        onLogout={console.info}
        render={(props: any) => (
          <button
            onClick={props.onClick}
            className="px-6 py-3 text-lg font-semibold rounded-md shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-yellow-400 text-gray-800 hover:bg-yellow-300"
          >
            Kakao 로그인
          </button>
        )}
      /> */}
            <button
        type="submit"
       className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">

        KaKao로그인
      </button>
    </div>
  );
};

export default SocialLogin;