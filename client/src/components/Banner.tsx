import React, { useState } from "react";
import { Link } from "react-router-dom";
import WritingImage from "../Image/Banner.png";
import GuideIcon from "../Icon/guideIcon.png";

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  // 로그인 여부를 sessionStorage에서 확인
  const [isLoggedIn] = useState<boolean>(() => {
    return !!sessionStorage.getItem("token");
  });

  return (
    <div
      className={`w-full bg-white flex justify-center items-center ${className}`}
    >
      <div className="max-w-[1140px] w-full flex flex-col lg:flex-row justify-between items-center relative">
        {/* Text area */}
        <div className="flex-1 flex flex-col justify-start items-start gap-6">
          <div className="DailyMoodDiaryWithMaegeul text-indigo-600 text-sm font-bold font-['Inter'] leading-tight tracking-widest">
            Daily Mood Diary with Maegeul
          </div>
          <div className="5 h-11 text-blue-950 text-4xl font-medium font-['plus-jakarta-sans'] leading-10 tracking-tight">
            나를 돌보는 하루 5분 습관
          </div>
          <div className=" h-[147px] text-blue-950 text-6xl font-extrabold font-['plus-jakarta-sans'] leading-40">
            마음챙김 글쓰기 <br />
            매글과 시작해요
          </div>
          <div className="w-[470px]">
            <span className="text-slate-500 text-base font-bold font-['plus-jakarta-sans'] tracking-tight leading-loose">
              매일 글로 기록하는 나의 감정, 매글과 함께 시작하는 하루 기록{" "}
              <br />
            </span>
            <span className="text-slate-500 text-base font-medium font-['plus-jakarta-sans'] leading-loose tracking-tight">
              바쁜 일상을 살다보면 나의 기분과 감정을 돌볼 시간이 부족해요.
              <br />
              매글에선 5분만에 오늘의 무드 진단과 일기 작성까지 가능해요!{" "}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* 로그인 상태에 따라 링크 경로 변경 */}
            <Link to={isLoggedIn ? "/maegeul" : "/mainsignup"}>
              <button className="px-7 py-4 bg-indigo-600 rounded-lg text-white text-sm font-bold font-['plus-jakarta-sans']">
                지금 바로 시작하기
              </button>
            </Link>
            <button
              className="px-4 py-2 rounded-xl text-blue-950 text-sm font-medium font-['plus-jakarta-sans']
             inline-flex gap-2 justify-center items-center leading-normal"
            >
              <img src={GuideIcon} />
              이용 가이드 보기
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="w-full lg:w-[456px] h-[600px] lg:h-[640px] relative">
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
