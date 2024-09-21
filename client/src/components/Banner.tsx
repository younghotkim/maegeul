//client2/src/components/Banner.tsx
import React from "react";
import { Link } from "react-router-dom";
import WritingImage from "../Image/Banner.png";

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  return (
    <div
      className={`w-full bg-white flex justify-center items-center py-16 ${className}`}
    >
      <div className="max-w-[1140px] w-full flex flex-col lg:flex-row justify-between items-center relative lg:px-12 md:px-8 sm:px-4">
        {/* Text area */}
        <div className="flex-1 flex flex-col justify-start items-start gap-6 mb-8 lg:mb-0">
          <h1 className="text-blue-950 text-5xl font-extrabold font-['Plus Jakarta Sans'] leading-tight lg:text-4xl md:text-3xl sm:text-2xl">
            나를 돌보는 하루 5분 <br />
            마음 챙김 글쓰기 <br />
            매글과 시작해요!
          </h1>
          <p className="text-slate-500 text-base font-medium font-['Plus Jakarta Sans'] leading-loose lg:text-sm md:text-xs">
            매일 글로 감정을 기록하며 나를 돌보는 루틴을 만들어요.
            <br />
            매일 더 편안하고 활기찬 기분이 들 수 있도록 매글이 도울게요!
          </p>
          <div className="flex items-center gap-4">
            <Link to="/maegeul">
              <button className="px-7 py-4 bg-indigo-600 rounded-lg text-white text-sm font-bold font-['Plus Jakarta Sans']">
                무드일기 작성하기
              </button>
            </Link>
            <button className="px-4 py-2 rounded-xl text-blue-950 text-sm font-medium font-['Plus Jakarta Sans']">
              가이드 보기
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="w-full lg:w-[456px] h-[480px] lg:h-[640px] relative">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src={WritingImage}
              alt="Writing"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
