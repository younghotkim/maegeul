//client2/src/pages/Auth/Logout.tsx
import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; // `useNavigate` 훅을 사용하여 리다이렉트

const LogoutForm = () => {
  const navigate = useNavigate(); // 리다이렉트 훅

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:5000/users/logout");
        localStorage.removeItem("token"); // 토큰 제거
        navigate("/"); // 메인 페이지로 리다이렉트
      } catch (err) {
        console.error("로그아웃에 실패했습니다.", err);
      }
    };

    handleLogout();
  }, [navigate]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default LogoutForm;
