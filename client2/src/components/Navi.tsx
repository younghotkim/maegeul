// src/components/Navi.tsx
import React from 'react';
import SearchPurple from '../Icon/Search Purple.png';
import ArrowPurple from '../Icon/Arrow Purple.png';
import { Link } from 'react-router-dom';
import step1 from '../Icon/step1_face.png';
import step2 from '../Icon/step2_pencil.png';
import step3 from '../Icon/Article Ticket.png';
import stepRight from '../Icon/stepRight.png';

const Navi: React.FC = () => {
  return (
    <div className="relative w-full h-auto p-8 flex flex-col items-center">
      <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-12">
        나를 발견하기 위한 공간
      </h1>
      <div className="flex justify-center items-start gap-5">
        {/* 왼쪽: 두 개의 작은 카드 */}
        <div className="flex flex-col gap-5">
          {/* 첫 번째 카드 */}
          <Link
            to="/maegeul"
            className="group w-[623px] h-60 bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-10 transition-colors hover:bg-scampi-100 hover:dark:bg-scampi-800"
          >
            <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4">
              작은 실천으로 시작하는 단단한 나
            </p>
            <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7">
              매일 글쓰기
            </h2>
          </Link>

          {/* 두 번째 카드 */}
          <Link
            to="/emotionForm"
            className="group w-[623px] h-60 bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-10 transition-colors hover:bg-scampi-100 hover:dark:bg-scampi-800"
          >
            <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4">
              AI가 분석해주는 나의 하루
            </p>
            <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7">
              AI 하루진단
            </h2>
          </Link>
        </div>

        {/* 오른쪽: 큰 카드 */}
        <Link
          to="/mydiary"
          className="group w-[623px] h-full bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-8 flex flex-col justify-between transition-colors hover:bg-scampi-100 hover:dark:bg-scampi-800"
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
            {/* 첫 번째 버튼 */}
            <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-200 dark:hover:bg-scampi-700 transition-colors cursor-pointer">
              <img src={SearchPurple} alt="Search Icon" className="w-4 h-4 mr-2" />
              <span className="text-scampi-700 dark:text-scampi-300 text-lg">
                나의 하루를 단어 구름으로 본다면?
              </span>
              <img src={ArrowPurple} alt="Arrow Icon" className="w-4 h-4 ml-auto" />
            </div>
            {/* 두 번째 버튼 */}
            <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-200 dark:hover:bg-scampi-700 transition-colors cursor-pointer">
              <img src={SearchPurple} alt="Search Icon" className="w-4 h-4 mr-2" />
              <span className="text-scampi-700 dark:text-scampi-300 text-lg">
                나의 감정 변화 그래프는 어떤 모습일까?
              </span>
              <img src={ArrowPurple} alt="Arrow Icon" className="w-4 h-4 ml-auto" />
            </div>
            {/* 세 번째 버튼 */}
            <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-200 dark:hover:bg-scampi-700 transition-colors cursor-pointer">
              <img src={SearchPurple} alt="Search Icon" className="w-4 h-4 mr-2" />
              <span className="text-scampi-700 dark:text-scampi-300 text-lg">
                지금 나에게 필요한 콘텐츠는 뭘까?
              </span>
              <img src={ArrowPurple} alt="Arrow Icon" className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </Link>
      </div>

      {/* 글쓰기 프로세스 */}
      <div className="mt-16 w-full text-center">
        <p className="text-scampi-400 dark:text-scampi-600 text-sm mb-2">추천 프로세스</p>
        <h2 className="text-scampi-700 dark:text-scampi-300 text-3xl font-bold mb-4">매일 글쓰기 습관 STEP3</h2>
        <p className="text-scampi-400 dark:text-scampi-600 text-sm mb-20">매일 글쓰기로 나의 일상과 감정을 기록하고 싶다면 아래 프로세스를 따라가 보아요!</p>
        
        <div className="flex justify-center items-center space-x-8">
          {/* 스텝 1 */}
          <Step 
            imgSrc={step1} 
            stepTitle="1. 감정 기록"
            description1="오늘 나는 어떤 기분일까?"
            description2="기분 수치를 측정하고 감정 키워드들을"
            description3="선택할 수 있어요"
          />

          <img src={stepRight} alt="Next Step Icon" className="text-scampi-300 text-4xl" />

          {/* 스텝 2 */}
          <Step 
            imgSrc={step2} 
            stepTitle="2. 일기 작성"
            description1="나의 하루는 어땠을까?"
            description2="가이드 라인에 맞춰 일기를 작성해보세요"
          />

          <img src={stepRight} alt="Next Step Icon" className="text-scampi-300 text-4xl" />

          {/* 스텝 3 */}
          <Step 
            imgSrc={step3} 
            stepTitle="3. AI 하루진단"
            description1="내 일기는 어떤 감정들로 채워져 있을까?"
            description2="AI가 당신의 일기를 분석해드려요"
          />
        </div>
      </div>
    </div>
  );
};

// 스텝 컴포넌트
const Step: React.FC<{ imgSrc: string, stepTitle: string, description1: string, description2: string, description3?: string }> = ({ imgSrc, stepTitle, description1, description2, description3 }) => {
  return (
    <div className="flex flex-col items-center">
      {/* 아이콘 배경 만들기 */}
      <div className="w-24 h-24 bg-scampi-700 rounded-full flex items-center justify-center text-white mb-4">
        {/* 아이콘 넣기 */}
        <img src={imgSrc} alt={`${stepTitle} Icon`} className="w-1/2 h-1/2 object-contain rounded-full" />
      </div>
      <p className="text-scampi-700 dark:text-scampi-300 text-xl font-semibold mb-3">{stepTitle}</p>
      <p className="text-scampi-400 dark:text-scampi-600 text-sm">{description1}</p>
      <p className="text-scampi-400 dark:text-scampi-600 text-sm">{description2}</p>
      {description3 && <p className="text-scampi-400 dark:text-scampi-600 text-sm">{description3}</p>}
    </div>
  );
};

export default Navi;