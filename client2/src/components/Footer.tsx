// src/components/Footer.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../Icon/Arrow Purple.png";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 px-2 mb-8 lg:mb-0">
            {/* Footer Description */}
            <div className="text-left text-scampi-500 text-lg font-normal mb-8">
              단단한 나를 만드는 5분 글쓰기 습관, 매글! <br />
              간편한 이메일 가입으로 지금 바로 시작해 볼까요?
            </div>

            {/* Newsletter Input and Button */}
            <div className="flex items-center gap-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-55 h-12 p-5 bg-gray-100 rounded-full border-gray-300 placeholder-scampi-500 text-scampi-700"
              />
              <Link to="/mainsignup">
                <button className="w-55 h-12 p-3 bg-scampi-500 rounded-full dark:bg-scampi-600 text-white shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
                  Sign up
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: Footer Content */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="grid grid-cols-3 gap-25">
              <div className="space-y-4">
                <h3 className="text-scampi-500 text-xl font-bold">안내 사항</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      회사 소개
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      제휴 문의
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      회원 약관
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      개인정보처리방침
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-scampi-500 text-xl font-bold">이용 안내</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      매글 소개
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      콘텐츠 제휴
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      매글 비즈니스
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-scampi-500 text-xl font-bold">고객 센터</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      도움말
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      공지사항
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-scampi-500 hover:text-scampi-700"
                    >
                      이메일 문의
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full border-t border-gray-300 pt-4 mt-8">
          <div className="text-center text-scampi-500 text-lg font-normal">
            Copyright © 2024 릿미 | All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
