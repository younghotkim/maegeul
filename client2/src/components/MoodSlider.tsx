// src/components/MoodSlider.tsx
import React, { useState } from 'react';
import './MoodSlider.css'; // 커스텀 스타일을 위한 CSS 파일 추가
import Emoji_1 from '../Icon/emoji_1.gif';
import Emoji_3 from '../Icon/emoji_3.gif';
import Emoji_5 from '../Icon/emoji_5.gif';
import Emoji_7 from '../Icon/emoji_7.gif';
import Emoji_9 from '../Icon/emoji_9.gif';

interface MoodSliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
}

const MoodSlider: React.FC<MoodSliderProps> = ({ onValueChange, onSubmit }) => {
  const [value, setValue] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onValueChange(value);
    onSubmit(); // onSubmit을 호출하여 EnergySlider의 상태를 업데이트
  };

  const handleRetry = () => {
    setSubmitted(false);
    setValue(5); // 초기값을 5로 설정
    onValueChange(5); // 상위 컴포넌트에 업데이트된 값 전달
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {!submitted ? (
        <div className="text-center mt-8">
          <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-4">
            오늘의 편안함 정도는?
          </h1>
          <p className="text-scampi-700 dark:text-scampi-300 text-sm font-medium font-['DM Sans'] leading-10">
            지금 내가 느끼는 편안한 정도를 수치로 기록해봐요.
          </p>
          <div className="relative w-full mx-auto py-8">
            <div className="relative w-10 flex items-center justify-between gap-10">
              <img src={Emoji_1} className="emoji-style" />
              <img src={Emoji_3} className="emoji-style" />
              <img src={Emoji_5} className="emoji-style" />
              <img src={Emoji_7} className="emoji-style" />
              <img src={Emoji_9} className="emoji-style" />
            </div>
            <div className="relative w-full mt-4">
              <input
                type="range"
                min="0"
                max="10"
                value={value}
                onChange={handleSliderChange}
                className="mood-slider" // External CSS for custom slider styles
              />
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
              <p className="text-4xl text-scampi-600">{value}</p>
            </div>
            {/* <button onClick={handleSubmit} className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
              측정완료
            </button> */}
          </div>
        </div>
      ) : (
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
