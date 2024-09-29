import React from "react";
import { Link } from "react-router-dom"; // 회원가입 링크를 사용하기 위해 react-router-dom import
import mainLogo from "../logo/main_logo.png";

interface ModalProps {
  isOpen: boolean;
  message: React.ReactNode; // string 대신 ReactNode로 변경
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center font-medium font-plus-jakarta-sans">
        {/* 로고 크기 조정 */}
        <img
          src={mainLogo}
          className="w-24 h-24 mx-auto mb-10"
          alt="Main Logo"
        />
        {/* 메세지 섹션 */}
        <div className="text-xl font-bold mb-10">{message}</div>

        <div className="flex justify-around mt-10">
          {/* 회원가입 버튼 */}
          <Link to="/mainsignup">
            <button className="bg-blue-400 text-white text-lg px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200">
              회원가입
            </button>
          </Link>

          {/* 닫기 버튼 */}
          <button
            className="bg-gray-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
