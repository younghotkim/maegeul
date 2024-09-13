import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // `useNavigate` 훅을 사용하여 리다이렉트
import { useUser } from "../../context/UserContext"; // UserContext 훅 사용

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태
  const navigate = useNavigate(); // 리다이렉트 훅
  const { setUser } = useUser(); // UserContext에서 setUser 가져오기

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 이전 에러 초기화

    console.log("로그인 요청을 보냅니다:", email, password);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("응답을 받았습니다:", response);

      // 로그인 성공 시
      if (response.data && response.data.token) {
        console.log("토큰을 받았습니다:", response.data.token);

        localStorage.setItem("token", response.data.token); // JWT 토큰을 로컬 스토리지에 저장
        // UserContext에 사용자 정보 저장
        setUser({
          profile_name: response.data.user.profileName, // 응답으로 받은 사용자 정보
        });
        navigate("/"); // 메인 페이지로 리다이렉트
      }
    } catch (err: any) {
      console.log("에러가 발생했습니다:", err);
      // 로그인 실패 시
      if (err.response && err.response.data) {
        setError(err.response.data.msg || "로그인에 실패했습니다.");
      } else {
        setError("서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col w-full max-w-lg mx-auto dark:bg-gray-800 dark:text-white"
    >
      {error && <div className="text-red-500 mb-2">{error}</div>}{" "}
      {/* 에러 메시지 표시 */}
      <div className="h-10 text-white py-2 px-4 ">이메일주소</div>
      <input
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        name="email"
        onChange={handleEmailChange}
        className="p-3 mb-2 text-lg border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-scampi-300 dark:bg-gray-800 dark:text-white"
      />
      <div className="h-10 text-white py-2 px-4 rounded-full">비밀번호</div>
      <input
        type="password"
        placeholder="숫자, 특수문자, 영문 포함 8자 이상"
        value={password}
        name="password"
        onChange={handlePasswordChange}
        className="p-3 mb-2 text-lg border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-scampi-300 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
      >
        로그인하기
      </button>
      <div className="flex justify-between mt-4">
        <Link
          to="/Signup"
          className="text-scampi-500 hover:text-scampi-700 transition-colors duration-300"
        >
          회원가입
        </Link>
        <Link
          to="/findPassword"
          className="text-scampi-500 hover:text-scampi-700 transition-colors duration-300"
        >
          비밀번호 찾기
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
