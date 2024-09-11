//client2/src/pages/Auth/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const SignupForm4 = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/users/join', {
        name,
        nickname,
        email,
        password
      });

      // 회원가입 성공 시
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (err) {
      // 에러 객체를 콘솔에 로그로 출력하여 구조 확인
      console.error('Signup error:', err);

      if (axios.isAxiosError(err)) {
        // Axios 에러 처리
        if (err.response) {
          // 서버 응답의 구조를 확인하고 적절한 필드를 사용
          const errorMessage = err.response.data.msg || err.response.data.message || '회원가입에 실패했습니다.';
          setError(errorMessage);
        } else {
          setError('서버 응답이 없습니다.');
        }
      } else {
        // Axios 이외의 에러 처리
        setError('예기치 않은 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-xl text-scampi-600 mb-5">
        이메일과 비밀번호 입력하기
      </h1>
    <form onSubmit={handleSignup} className="flex flex-col w-full max-w-lg mx-auto">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="이름을 입력해 주세요"
        value={name}
        onChange={handleNameChange}
        className="p-3 mb-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <input
        type="text"
        placeholder="닉네임을 입력해 주세요"
        value={nickname}
        onChange={handleNicknameChange}
        className="p-3 mb-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <input
        type="text"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={handleEmailChange}
        className="p-3 mb-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={handlePasswordChange}
        className="p-3 mb-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <button
        type="submit"
        className="p-3 text-lg font-semibold text-white bg-teal-500 rounded-md shadow-md hover:bg-teal-600 focus:outline-none transition-colors duration-300"
      >
        회원가입
      </button>
      <div className="flex justify-between mt-4">
        <Link to="/login" className="text-teal-500 hover:text-teal-700 transition-colors duration-300">로그인</Link>
      </div>
    </form>
    </div>
    </>
  );
};

export default SignupForm4;