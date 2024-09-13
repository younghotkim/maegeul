import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from "axios"; // Axios 추가

const SignupStep2: React.FC = () => {
  const navigate = useNavigate(); // 회원가입 성공 후 페이지 이동을 위한 useNavigate
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    gender: "",
    age: "",
    birthdate: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    nickname: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 필수 입력 값 체크
    if (name in errors) {
      setErrors({ ...errors, [name]: value.trim() === "" });
    }
  };

  // 나이를 계산하는 함수
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // 생일이 아직 지나지 않았다면 나이에서 1을 뺌
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // 회원가입 API 호출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 값 검증
    const requiredFields = ["email", "password", "name", "nickname"];
    const hasErrors = requiredFields.some(
      (field) => formData[field as keyof typeof formData].trim() === ""
    );

    if (hasErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        requiredFields.forEach((field) => {
          if (formData[field as keyof typeof formData].trim() === "") {
            newErrors[field as keyof typeof errors] = true;
          }
        });
        return newErrors;
      });
      return;
    }

    const age = calculateAge(formData.birthdate);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email: formData.email,
        password: formData.password,
        username: formData.name,
        profile_name: formData.nickname,
        gender: formData.gender,
        age,
        profile_picture: formData.profileImage,
      });

      if (response.status === 201) {
        console.log("회원가입 성공", response.data);
        // 회원가입 성공 후 다음 단계로 이동
        navigate("/signupstep3");
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      if (axios.isAxiosError(err) && err.response) {
        console.error("에러 메시지:", err.response.data.message);
      }
    }
  };

  // 현재 연도를 계산
  const currentYear = new Date().getFullYear();

  return (
    <form
      onSubmit={handleSubmit} // Form 제출 시 handleSubmit 호출
      className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5 dark:bg-gray-800"
    >
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-900 relative">
        <h2 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">
          STEP 2
        </h2>
        <div className="w-full border-t-8 border-scampi-500 pt-4 mt-8 text-center text-scampi-700 dark:text-scampi-300"></div>
        <h3 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">
          나의 정보 입력하기
        </h3>

        {/* 이메일 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            이메일
          </div>
          <div
            className={`w-full bg-slate-50 border ${
              errors.email ? "border-red-500" : "border-gray-400"
            } rounded-3xl p-3 flex justify-between items-center`}
          >
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
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            비밀번호
          </div>
          <div
            className={`w-full bg-slate-50 border ${
              errors.password ? "border-red-500" : "border-gray-400"
            } rounded-3xl p-3 flex justify-between items-center`}
          >
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
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            이름
          </div>
          <div
            className={`w-full bg-slate-50 border ${
              errors.name ? "border-red-500" : "border-gray-400"
            } rounded-3xl p-3 flex justify-between items-center`}
          >
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
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            닉네임
          </div>
          <div
            className={`w-full bg-slate-50 border ${
              errors.nickname ? "border-red-500" : "border-gray-400"
            } rounded-3xl p-3 flex justify-between items-center`}
          >
            <input
              type="text"
              placeholder="예> Kenzi"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
            <button className="ml-2 px-4 py-1 text-scampi-600 border border-scampi-600 rounded-full text-sm">
              중복확인
            </button>
          </div>
        </div>

        {/* 생년월일 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            생년월일 (YYYY-MM-DD)
          </div>
          <div className="w-full bg-slate-50 border border-gray-400 rounded-3xl p-3 flex justify-between items-center">
            <input
              type="text" // 텍스트 입력으로 생년월일을 입력받음
              placeholder="YYYY-MM-DD"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* 프로필 이미지 업로드 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            프로필 이미지
          </div>
          <div className="Input w-64 h-72 bg-slate-50 rounded-3xl border border-gray-400 flex items-center justify-center mb-4">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile Preview"
                className="object-cover w-full h-full rounded-3xl"
              />
            ) : (
              <span className="text-gray-400">이미지를 업로드하세요.</span>
            )}
          </div>
          <button className="px-4 py-2 text-white bg-scampi-600 rounded-3xl">
            이미지 선택
          </button>
        </div>

        {/* 성별 입력 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            성별
          </div>
          <select
            className="w-full bg-slate-50 border border-gray-400 rounded-3xl p-3 text-gray-800"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="">선택 안함</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        {/* 완료 버튼 */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-6 py-4 text-base font-bold text-white bg-scampi-600 rounded-3xl"
          >
            회원가입 완료
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignupStep2;
