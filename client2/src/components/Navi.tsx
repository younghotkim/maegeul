// src/components/Navi.tsx
import React, { useEffect, useRef, useState } from "react";
import SearchPurple from "../Icon/Search Purple.png";
import ArrowPurple from "../Icon/Arrow Purple.png";
import { Link } from "react-router-dom";
import step1 from "../Icon/step1_face.png";
import step2 from "../Icon/step2_pencil.png";
import step3 from "../Icon/Article Ticket.png";
import stepRight from "../Icon/stepRight.png";

const Navi: React.FC = () => {
  const [isVisible, setIsVisible] = useState({
    cards: false,
    process: false,
  });

  const cardsRef = useRef<HTMLDivElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === cardsRef.current) {
          setIsVisible((prev) => ({ ...prev, cards: entry.isIntersecting }));
        } else if (entry.target === processRef.current) {
          setIsVisible((prev) => ({ ...prev, process: entry.isIntersecting }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (cardsRef.current) observer.observe(cardsRef.current);
    if (processRef.current) observer.observe(processRef.current);

    return () => {
      if (cardsRef.current) observer.unobserve(cardsRef.current);
      if (processRef.current) observer.unobserve(processRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-auto p-20 flex flex-col items-center">
      <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-12">
        나를 발견하기 위한 공간
      </h1>
      <div ref={cardsRef} className="flex justify-center items-start gap-5">
        <div
          className={`flex flex-col gap-5 transition-all duration-1000 ${
            isVisible.cards
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          {/* 왼쪽: 두 개의 작은 카드 */}
          <Card
            to="/maegeul"
            title="매일 글쓰기"
            description="작은 실천으로 시작하는 단단한 나"
          />
          <Card
            to="/emotionForm"
            title="AI 하루진단"
            description="AI가 분석해주는 나의 하루"
          />
        </div>

        {/* 오른쪽: 큰 카드 */}
        <Link
          to="/mypage"
          className={`group w-[623px] h-full bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-8 flex flex-col justify-between transition-all duration-1000 ${
            isVisible.cards
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div>
            <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4">
              나의 일상 & 감정 아카이브
            </p>
            <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7">
              마이 다이어리
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {/* 버튼들 */}
            <DiaryButton text="나의 하루를 단어 구름으로 본다면?" />
            <DiaryButton text="나의 감정 변화 그래프는 어떤 모습일까?" />
            <DiaryButton text="지금 나에게 필요한 콘텐츠는 뭘까?" />
          </div>
        </Link>
      </div>

      {/* 글쓰기 프로세스 */}
      <div
        ref={processRef}
        className={`mt-16 w-full text-center transition-all duration-1000 ${
          isVisible.process
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        }`}
      >
        <ProcessSection />
      </div>
    </div>
  );
};

// 재사용 가능한 Card 컴포넌트
const Card: React.FC<{ to: string; title: string; description: string }> = ({
  to,
  title,
  description,
}) => (
  <Link
    to={to}
    className="group w-[623px] h-60 bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-10 transition-colors hover:bg-scampi-100 hover:dark:bg-scampi-800"
  >
    <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4">
      {description}
    </p>
    <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7">
      {title}
    </h2>
  </Link>
);

// 재사용 가능한 DiaryButton 컴포넌트
const DiaryButton: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-200 dark:hover:bg-scampi-700 transition-colors cursor-pointer">
    <img src={SearchPurple} alt="Search Icon" className="w-4 h-4 mr-2" />
    <span className="text-scampi-700 dark:text-scampi-300 text-lg">{text}</span>
    <img src={ArrowPurple} alt="Arrow Icon" className="w-4 h-4 ml-auto" />
  </div>
);

// 글쓰기 프로세스 섹션 컴포넌트
const ProcessSection: React.FC = () => (
  <>
    <p className="text-scampi-400 dark:text-scampi-600 text-sm mb-2">
      추천 프로세스
    </p>
    <h2 className="text-scampi-700 dark:text-scampi-300 text-3xl font-bold mb-4">
      매일 글쓰기 습관 STEP3
    </h2>
    <p className="text-scampi-400 dark:text-scampi-600 text-sm mb-20">
      매일 글쓰기로 나의 일상과 감정을 기록하고 싶다면 아래 프로세스를 따라가
      보아요!
    </p>
    <div className="flex justify-center items-center space-x-8">
      {/* 각 스텝을 나열 */}
      <Step
        imgSrc={step1}
        stepTitle="1. 감정 기록"
        description1="오늘 나는 어떤 기분일까?"
        description2="기분 수치를 측정하고 감정 키워드들을"
        description3="선택할 수 있어요"
      />
      <img
        src={stepRight}
        alt="Next Step Icon"
        className="text-scampi-300 text-4xl"
      />
      <Step
        imgSrc={step2}
        stepTitle="2. 일기 작성"
        description1="나의 하루는 어땠을까?"
        description2="가이드 라인에 맞춰 일기를 작성해보세요"
      />
      <img
        src={stepRight}
        alt="Next Step Icon"
        className="text-scampi-300 text-4xl"
      />
      <Step
        imgSrc={step3}
        stepTitle="3. AI 하루진단"
        description1="내 일기는 어떤 감정들로 채워져 있을까?"
        description2="AI가 당신의 일기를 분석해드려요"
      />
    </div>
  </>
);

// Step 컴포넌트
const Step: React.FC<{
  imgSrc: string;
  stepTitle: string;
  description1: string;
  description2: string;
  description3?: string;
}> = ({ imgSrc, stepTitle, description1, description2, description3 }) => (
  <div className="flex flex-col items-center">
    {/* 아이콘 배경 만들기 */}
    <div className="w-24 h-24 bg-scampi-700 rounded-full flex items-center justify-center text-white mb-4">
      {/* 아이콘 넣기 */}
      <img
        src={imgSrc}
        alt={`${stepTitle} Icon`}
        className="w-1/2 h-1/2 object-contain rounded-full"
      />
    </div>
    <p className="text-scampi-700 dark:text-scampi-300 text-xl font-semibold mb-3">
      {stepTitle}
    </p>
    <p className="text-scampi-400 dark:text-scampi-600 text-sm">
      {description1}
    </p>
    <p className="text-scampi-400 dark:text-scampi-600 text-sm">
      {description2}
    </p>
    {description3 && (
      <p className="text-scampi-400 dark:text-scampi-600 text-sm">
        {description3}
      </p>
    )}
  </div>
);

export default Navi;
