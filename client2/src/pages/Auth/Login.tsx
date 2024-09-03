//client2/src/pages/Auth/Login.tsx
import React from 'react';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import Header from '../../components/Header';

const Login = () => {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
      <h1 className="text-xl text-scampi-600 mb-5 dark:text-white">
        아래 방법들 중 선택하여 로그인을 할 수 있습니다.
      </h1>
      <LoginForm />
      <SocialLogin />
    </div>
    </>
  );
};

export default Login;