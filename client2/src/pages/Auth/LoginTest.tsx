import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const LoginTest = () => {
  const { setUser } = useUser(); // useUser에서 setUser 가져오기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 백엔드 API에 맞게 로그인 요청을 보냄
      const response = await axios.post("http://localhost:5000/api/login", {
        // 백엔드의 URL을 확인하고 수정
        email,
        password,
      });

      // 백엔드에서 반환하는 데이터를 구조분해할당으로 가져옴
      const { profile_name, token } = response.data;

      // 사용자 정보 및 JWT 토큰 저장
      setUser({ profile_name });
      localStorage.setItem("token", token);

      // 홈 화면으로 이동
      navigate("/home");

      // 콘솔에서 확인
      console.log(localStorage.getItem("token"));
      console.log("Profile Name:", profile_name);
    } catch (err: any) {
      // 에러 처리
      if (err.response) {
        console.error("Login Error:", err.response.data);
        setError(
          `로그인 실패: ${
            err.response.data.message || "서버 오류가 발생했습니다."
          }`
        );
      } else {
        console.error("Login Error:", err.message);
        setError("로그인 실패.");
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>

      {/* 이메일 입력 필드 */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-bold mb-2">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginTest;
