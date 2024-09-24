import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from "axios"; // Axios 추가

// 환경 변수에서 BASE_URL을 가져오고, 없으면 기본값으로 localhost 사용
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

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
    profileImageFile: null as File | null, // 실제 파일 저장용
  });

  // 파일 선택 시 처리 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(file), // 미리보기 URL 생성
        profileImageFile: file, // 실제 파일 저장
      });
    }
  };

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    nickname: false,
    birthdate: false, // 생년월일 오류 플래그 추가
  });

  // 생년월일 형식 검증 함수
  const validateBirthdate = (birthdate: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(birthdate);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 필수 입력 값 체크 및 생년월일 형식 확인
    if (name === "birthdate") {
      setErrors({ ...errors, birthdate: !validateBirthdate(value) });
    } else if (name in errors) {
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

  const age = calculateAge(formData.birthdate);
  // 현재 연도를 계산
  const currentYear = new Date().getFullYear();

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.filePath; // 서버에서 반환된 파일 경로
  };

  // 서버로 데이터를 전송하는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let profileImageUrl = "";

      // 파일 업로드 먼저 처리
      if (formData.profileImageFile) {
        profileImageUrl = await uploadFile(formData.profileImageFile);
      }

      // FormData 객체 생성 (사용자 정보)
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("username", formData.name);
      formDataToSend.append("profile_name", formData.nickname);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("birthdate", formData.birthdate);

      // 프로필 이미지 경로 추가
      if (profileImageUrl) {
        formDataToSend.append("profile_picture", profileImageUrl);
      }

      // 서버에 데이터 전송
      const response = await axios.post(
        `${BASE_URL}/api/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("회원가입 성공", response.data);
        navigate("/signupstep3"); // 성공 시 리다이렉트
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
    }
  };

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
              placeholder="이름"
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
              placeholder="닉네임"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 focus:outline-none"
            />
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
          {errors.birthdate && (
            <div className="text-red-500 text-sm mt-2">
              생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)
            </div>
          )}
        </div>

        {/* 프로필 이미지 업로드 섹션 */}
        <div className="mb-6">
          <div className="text-slate-500 text-lg font-bold font-['DM Sans'] leading-none mb-2">
            프로필 이미지
          </div>
          <div className="Input w-64 h-72 bg-slate-50 rounded-3xl border border-gray-400 flex items-center justify-center mb-4 relative">
            {formData.profileImage ? (
              <>
                <img
                  src={formData.profileImage}
                  alt="Profile Preview"
                  className="object-cover w-full h-full rounded-3xl"
                />
                {/* 삭제 버튼 */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      profileImage: "",
                      profileImageFile: null,
                    })
                  }
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  삭제
                </button>
              </>
            ) : (
              <span className="text-gray-400">이미지를 업로드하세요.</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
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
