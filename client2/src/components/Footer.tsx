// src/components/Footer.tsx
// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="max-w-screen-xl mx-auto p-8 relative">
        {/* Footer Description */}
        <div className="text-center text-gray-600 text-lg font-normal mb-8">
          단단한 나를 만드는 5분 글쓰기 습관, 매글! 간편한 <br /> 이메일 가입으로 지금 바로 시작해 볼까요?
        </div>
        
        {/* Newsletter Input */}
        <div className="flex justify-center mb-8">
          <div className="relative w-96">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full h-16 p-6 bg-gray-100 rounded-3xl border border-gray-300 placeholder-gray-400 text-gray-700"
            />
            <button
              className="absolute right-0 top-0 w-28 h-14 bg-blue-500 text-white rounded-3xl ml-2 flex items-center justify-center font-bold"
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 text-lg font-normal">
              Copyright © 2024 릿미 | All Rights Reserved
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-facebook-f"></i> {/* Add FontAwesome or relevant icons */}
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="space-y-4">
            <h3 className="text-gray-700 text-xl font-bold">안내 사항</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">회사 소개</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">제휴 문의</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">회원 약관</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">개인정보처리방침</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-gray-700 text-xl font-bold">이용 안내</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">매글 소개</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">콘텐츠 제휴</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">매글 비즈니스</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-gray-700 text-xl font-bold">고객 센터</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">도움말</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">공지사항</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">이메일 문의</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">챗봇 문의</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

