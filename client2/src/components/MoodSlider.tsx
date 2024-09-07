// src/components/MoodSlider.tsx
import React, { useState } from 'react';
import './MoodSlider.css'; // 커스텀 스타일을 위한 CSS 파일 추가
import Emoji_1 from '../Icon/emoji_1.gif';
import Emoji_5 from '../Icon/emoji_5.gif';
import Emoji_7 from '../Icon/emoji_7.gif';
import Info from '../Icon/Info.png'; 
import Tooltip from './Tooltip';

interface MoodSliderProps {
  onValueChange: (value: number) => void; // 슬라이더 값 변경 시 상위 컴포넌트에 전달하는 함수
  onSubmit: () => void; // 슬라이더 제출 시 상위 컴포넌트에 전달하는 함수
  submitted: boolean; // 제출 상태를 부모로부터 전달받음
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>; // 제출 상태 업데이트 함수를 부모로부터 전달받음
}

const MoodSlider: React.FC<MoodSliderProps> = ({ onValueChange, onSubmit, submitted, setSubmitted }) => { //구조분해해서 props를 받음.
  const [value, setValue] = useState(1); // 슬라이더의 현재 값을 관리하는 상태
  // const [submitted, setSubmitted] = useState(false); // 제출 상태를 관리하는 상태

  // 슬라이더 값을 초기화하고 재측정하는 함수
  const handleRetry = () => {
    setSubmitted(false); // 제출 상태를 초기화
    setValue(1); // 슬라이더 값을 초기값인 5로 재설정
    onValueChange(1); // 상위 컴포넌트에 초기값 5를 전달
  };

  // 슬라이더 값이 변경될 때마다 호출되는 함수
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value); // 슬라이더에서 선택한 새 값
    setValue(newValue); // 슬라이더 값을 상태로 저장
    onValueChange(newValue); // 상위 컴포넌트에 새로운 값 전달
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {/* 제출되지 않은 경우 슬라이더 UI 렌더링 */}
      {!submitted ? (
        <div className="text-center mt-8">
          <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-4">
            오늘의 편안함 정도는?
          </h1>
          <p className="text-scampi-700 dark:text-scampi-300 text-sm font-medium font-['DM Sans'] leading-10">
            지금 내가 느끼는 편안한 정도를 수치로 기록해봐요.
            <Tooltip 
            message='오늘 나의 편안함 수치는 몇인가요? 만족감, 쾌적함, 기쁨 등 내가 느낀 긍정 감정의 정도를 기록해 봅시다.'>
                <img src={Info} alt="Info" className="items-end cursor-pointer place-items-end" />
            </Tooltip>
          </p>          
          <div className="relative w-full mx-auto py-8">
            {/* 이모티콘 */}
            <div className="relative w-10 flex items-center justify-between gap-20">
                <img src={Emoji_1} className="emoji-style" style={{ left: `${(2 / 10) * 100}%` }} />
                <img src={Emoji_5} className="emoji-style" style={{ left: `${(5 / 10) * 100}%` }} />
                <img src={Emoji_7} className="emoji-style" style={{ left: `${(8 / 10) * 100}%` }} />
            </div>
            <div className="relative w-full mt-4">
              {/* 슬라이더 입력 */}
              <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={handleSliderChange} // 슬라이더 값 변경 시 호출
                className="mood-slider" // 외부 CSS에서 스타일 적용
              />
              {/* 슬라이더 마크 표시 */}
              <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mark) => (
                  <div key={mark} className="slider-mark" style={{ left: `${(mark / 10) * 100}%` }}>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-scampi-700 mt-4">
              <span>1</span>
              <span>10</span>
            </div>
            <div className="text-center mt-4">
              {/* 현재 슬라이더 값 표시 */}
              <p className="text-4xl text-scampi-600">{value}</p>
            </div>
            {/* 제출 버튼: 현재 주석 처리된 상태 */}
            {/* <button onClick={handleSubmit} className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
              측정완료
            </button> */}
          </div>
        </div>
      ) : (
        // 제출된 경우 "다시 측정하기" 버튼 표시
        <div className="text-center mt-8">
          <button onClick={handleRetry} className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            다시 측정하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodSlider;
