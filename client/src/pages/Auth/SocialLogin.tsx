import React from "react";
import KakaoLoginLg from "../../Icon/kakao_login_large_narrow.png";

// 스타일을 추가할 수도 있음
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const imageStyle: React.CSSProperties = {
  marginRight: "10px",
};

const KakaoLoginButton: React.FC = () => {
  const handleLogin = () => {
    // 로그인 엔드포인트로 리디렉션
    window.location.href = `${BASE_URL}/api/kakao/`;
  };

  return (
    <button onClick={handleLogin}>
      <img className="w-96 h-20" src={KakaoLoginLg} alt="Kakao Login Button" />
    </button>
  );
};

export default KakaoLoginButton;
