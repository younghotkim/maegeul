// client/src/components/Modal.tsx
import React from "react";
import { Link } from "react-router-dom"; // 회원가입 링크를 사용하기 위해 react-router-dom import
import { Iconify } from "../dashboardComponents/iconify"; // Iconify가 필요하므로 임포트
import mainLogo from "../logo/main_logo.png"; // 로고 파일

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; // 모달이 열리지 않았다면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <Iconify icon="ic:round-close" width={24} height={24} />
          </button>
          <img
            src={mainLogo}
            alt="Maegeul Icon"
            className="w-16 h-16 mx-auto mb-4"
          />
          <div
            className="text-center text-lg font-semibold mb-6"
            dangerouslySetInnerHTML={{ __html: message }} // 여기서 message로 수정
          ></div>

          <div className="flex justify-center space-x-4">
            <Link
              to="/mainlogin"
              className="px-8 py-3 border border-indigo-600 rounded-lg text-indigo-600 text-sm font-bold font-plus-jakarta-sans hover:bg-indigo-100 hover:shadow-lg"
            >
              로그인
            </Link>
            <Link
              to="/mainsignup"
              className="px-7 py-3 bg-indigo-600 rounded-lg text-white text-sm font-bold font-plus-jakarta-sans hover:bg-indigo-500 hover:shadow-lg"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
