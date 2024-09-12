//client2/src/pages/Auth/Signup2.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupStep2: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    profileImage: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    nickname: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 필수 입력 값 체크
    if (name in errors) {
      setErrors({ ...errors, [name]: value.trim() === '' });
    }
  };

  // 현재 연도를 계산
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5 dark:bg-gray-800">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-900 relative">
        {/* Step 1 Header */}
        <h2 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">STEP 2</h2>
         {/*  구분선 */}
        <div className="w-full border-t-8 border-scampi-500 pt-4 mt-8 text-center text-scampi-700 dark:text-scampi-300">
        </div>
        <h3 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">나의 정보 입력하기</h3>


        {/* 이메일 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">이메일</div>
          <div className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded-3xl p-3 flex justify-between items-center`}>
            <input
              type="text"
              placeholder="example@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* 비밀번호 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">비밀번호</div>
          <div className={`w-full bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-gray-400'} rounded-3xl p-3 flex justify-between items-center`}>
            <input
              type="password"
              placeholder="영문 포함 6자 이상 포함해주세요."
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* 이름 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">이름</div>
          <div className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded-3xl p-3 flex justify-between items-center`}>
            <input
              type="text"
              placeholder="예> 홍길동"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* 닉네임 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">닉네임</div>
          <div className={`w-full bg-slate-50 border ${errors.nickname ? 'border-red-500' : 'border-gray-400'} rounded-3xl p-3 flex justify-between items-center`}>
            <input
              type="text"
              placeholder="예> Kenzi"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
            <button className="ml-2 px-4 py-1 text-scampi-600 border border-scampi-600 rounded-full text-sm">중복확인</button>
          </div>
        </div>

        {/* 프로필 이미지 업로드 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">프로필 이미지</div>
          <div className="Input w-64 h-72 bg-slate-50 rounded-3xl border border-gray-400 flex items-center justify-center mb-4">
            {/* 이미지 미리보기 */}
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile Preview" className="object-cover w-full h-full rounded-3xl" />
            ) : (
              <span className="text-gray-400">이미지를 업로드하세요.</span>
            )}
          </div>
          <button className="px-4 py-2 text-white bg-scampi-600 rounded-3xl">이미지 선택</button>
        </div>

        {/* 성별 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">성별</div>
          <select
            className="w-full bg-slate-50 border border-gray-400 rounded-3xl p-3 text-gray-800"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">성별 선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        {/* 생년월일 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">생년월일</div>
          <div className="flex space-x-2">
            {/* 연도 선택 */}
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-1/3 bg-slate-50 border border-gray-400 rounded-3xl p-3 text-gray-800"
            >
              <option value="">년</option>
              {[...Array(currentYear - 1945 + 1)].map((_, i) => (
                <option key={i} value={1945 + i}>
                  {1945 + i}년
                </option>
              ))}
            </select>

            {/* 월 선택 */}
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-1/3 bg-slate-50 border border-gray-400 rounded-3xl p-3 text-gray-800"
            >
              <option value="">월</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>

            {/* 일 선택 */}
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-1/3 bg-slate-50 border border-gray-400 rounded-3xl p-3 text-gray-800"
            >
              <option value="">일</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}일
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="mt-8">
          <Link to="/signupstep3">
            <button className="w-full px-6 py-4 text-base font-bold text-white bg-scampi-600 rounded-3xl">
              회원가입 완료
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupStep2;


