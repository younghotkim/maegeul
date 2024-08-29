// src/components/Navi.tsx
import React from 'react';
// SVG 파일을 React 컴포넌트로 임포트
import { ReactComponent as ArrowIcon } from '../Icon/Arrow Right.svg';
import { ReactComponent as SearchIcon } from '../Icon/Search.svg';
import { Link } from 'react-router-dom';

const Navi: React.FC = () => {
  return (
    <div className="relative w-full h-auto p-8 flex flex-col items-center">
    <div className='grid-rows-2'>
      <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-12">
        나를 발견하기 위한 공간
      </h1>
      <div className="flex flex-wrap justify-center gap-12">
        {/* 첫 번째 카드 */}
        <Link to="/maegeul" className="group w-96 h-60 bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-8 transition-colors">
          <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4 group-hover:bg-scampi-100 group-hover:dark:bg-scampi-900">
            작은 실천으로 시작하는 단단한 나
          </p>
          <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7 group-hover:bg-scampi-50 group-hover:dark:bg-scampi-900 ">
            매일 글쓰기
          </h2>
        </Link>

        {/* 두 번째 카드 */}
        <Link to="/aiwriting" className="group w-96 h-60 bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-8 transition-colors">
          <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4 group-hover:bg-scampi-100 group-hover:dark:bg-scampi-900">
             AI가 분석해주는 나의 하루
          </p>
          <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7 group-hover:bg-scampi-50 group-hover:dark:bg-scampi-900 ">
            AI 하루진단
          </h2>
        </Link>

        {/* 세 번째 큰 카드 */}
        <Link to="/mydiary" className="group w-full h-auto bg-scampi-50 dark:bg-scampi-900 rounded-2xl p-8 flex flex-col justify-between transition-colors">
          <div>
          <p className="text-left text-scampi-400 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4 group-hover:bg-scampi-100 group-hover:dark:bg-scampi-900">
            나의 일상 & 감정 아카이브
            </p>
            <h2 className="text-left text-scampi-700 dark:text-scampi-300 text-2xl font-bold leading-7 group-hover:bg-scampi-50 group-hover:dark:bg-scampi-900 ">
            마이 다이어리
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {/* 첫 번째 버튼 */}
            <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-100 dark:hover:bg-scampi-800 transition-colors cursor-pointer group-hover:border-scampi-600 ">
              <SearchIcon className="w-4 h-4 mr-2 group-hover:text-scampi-900 group-hover:dark:text-scampi-900" />
              <span className="text-scampi-700 dark:text-scampi-300 text-lg ">
                나의 하루를 단어 구름으로 본다면?
              </span>
              <ArrowIcon className="w-4 h-4 ml-auto group-hover:text-scampi-50 group-hover:dark:text-scampi-900" />
            </div>
            {/* 두 번째 버튼 */}
            <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-100 dark:hover:bg-scampi-800 transition-colors cursor-pointer group-hover:border-scampi-600">
              <SearchIcon className="w-4 h-4 mr-2 group-hover:text-scampi-900 group-hover:dark:text-scampi-900" />
              <span className="text-scampi-700 dark:text-scampi-300 text-lg ">나의 감정 변화 그래프는 어떤 모습일까?
              </span>
              <ArrowIcon className="w-4 h-4 ml-auto group-hover:text-scampi-50 group-hover:dark:text-scampi-900" />
            </div>
            {/* 세 번째 버튼 */}
            <div className="w-full h-14 bg-transparent border border-scampi-600 rounded-3xl flex items-center px-6 hover:bg-scampi-100 dark:hover:bg-scampi-800 transition-colors cursor-pointer group-hover:border-scampi-600">
              <SearchIcon className="w-4 h-4 mr-2 group-hover:text-scampi-900 group-hover:dark:text-scampi-900" />
              <span className="text-scampi-700 dark:text-scampi-300 text-lg ">지금 나에게 필요한 콘텐츠는 뭘까?
              </span>
              <ArrowIcon className="w-4 h-4 ml-auto group-hover:text-scampi-50 group-hover:dark:text-scampi-900" />
            </div>
          </div>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Navi;
