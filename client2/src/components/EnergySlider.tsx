// src/components/EnergySlider.tsx
import React, { useState } from 'react';
import './MoodSlider.css'; // 커스텀 스타일을 위한 CSS 파일 추가
import Fire from '../Icon/fire.gif';
import ArrowWhite from '../Icon/Arrow White.png';
import Info from '../Icon/Info.png'; 
import Tooltip from './Tooltip';
interface EnergySliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnergySlider: React.FC<EnergySliderProps> = ({ onValueChange, onSubmit, submitted, setSubmitted }) => {
  const [value, setValue] = useState(1); // 슬라이더의 초기 값을 1로 설정


  const handleSubmit = () => {
    setSubmitted(true);
    onValueChange(value);
    onSubmit();
  };

  const handleRetry = () => {
    setSubmitted(false);
    setValue(1);
    onValueChange(1);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange(newValue);
  };

  // Fire 이모지 크기 조정
  const fireSize = 20 + (value - 1) * 2; // 슬라이더 값에 따라 이모지 크기 조정

  // Fire 이모지가 슬라이더 thumb를 따라 이동하도록 위치 설정
  const fireStyle: React.CSSProperties = {
    left: `${(value) * 100}%`, // 슬라이더 값에 따라 위치 조정
    transition: 'left 0.2s ease', // 위치 변화에 애니메이션 추가
    position: 'absolute', // CSSProperties 타입으로 인식되도록 수정
    top: '-30px', // Fire 이모지를 슬라이더 위로 위치 조정
    width: '${fireSize}px',
    height: '${fireSize}px',
  };

  return (
    <div className="flex flex-col items-center justify-between">
      {!submitted ? (
        <div className="text-center">
          <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 inline-flex items-center">
            오늘의 에너지 레벨은?
            {/* Tooltip을 h1 옆에 위치시키기 */}
            <Tooltip 
              message='오늘 나의 에너지 레벨은 몇인가요? 활성화 정도를 뜻하는 이 영역에서는 오늘 나의 각성, 흥분 정도를 기록해요.'>
              <img src={Info} alt="Info" className="ml-2 cursor-pointer" />
            </Tooltip>
          </h1>
          <p className="text-scampi-700 dark:text-scampi-300 text-sm font-medium font-['DM Sans'] leading-10">
          지금 내가 활력 정도를 수치로 기록해봐요.
          </p>  
          <div className="relative w-full mx-auto py-8">
            <div className="relative w-10 flex items-center justify-between">
              <img src={Fire} className="emoji-style" style={fireStyle} />
            </div>
            <div className="relative w-full mt-4">
              <input
                type="range"
                min="1"
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
            <button
              onClick={handleSubmit}
              className="bg-scampi-500 dark:bg-scampi-600 text-white py-1 px-10 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
            >
              측정완료 
              <img src={ArrowWhite} className='w-4 h-4 mr-2'/>
            </button>
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

export default EnergySlider;
