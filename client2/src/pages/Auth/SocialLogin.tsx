import React from 'react';

// 스타일을 추가할 수도 있음
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#FEE500',
  border: 'none',
  borderRadius: '12px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  color: '#3C1E1E',
  display: 'flex',
  alignItems: 'center',
};

const imageStyle: React.CSSProperties = {
  marginRight: '10px',
};

const KakaoLoginButton: React.FC = () => {
  const handleLogin = () => {
    // 로그인 엔드포인트로 리디렉션
    window.location.href = 'http://localhost:5000/auth/kakao';
  };

  return (
    <button style={buttonStyle} onClick={handleLogin}>
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
        alt="Kakao Login"
        style={imageStyle}
      />
      카카오로 로그인
    </button>
  );
};

export default KakaoLoginButton;
