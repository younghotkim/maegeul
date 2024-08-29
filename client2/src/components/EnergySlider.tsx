// src/components/EnergySlider.tsx
import React, { useState } from 'react';
import './MoodSlider.css'; // 커스텀 스타일을 위한 CSS 파일 추가
import { Link } from 'react-router-dom'; // 글쓰기 페이지 이동
import Fire from '../Icon/fire.gif';

interface EnergySliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
}

const EnergySlider: React.FC<EnergySliderProps> = ({ onValueChange, onSubmit }) => {
  const [value, setValue] = useState(5); // 슬라이더 값 기본값 5로 설정
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onValueChange(value);
    onSubmit();
  };

  const handleRetry = () => {
    setSubmitted(false);
    setValue(5); // 다시 측정 시 기본값 5로 설정
    onValueChange(5);
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    let newValue = Math.round((offsetX / rect.width) * 10);

    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;

    setValue(newValue);
    onValueChange(newValue);
  };

    // Fire 이모지가 슬라이더 thumb를 따라 이동하도록 위치 설정
    const fireStyle : React.CSSProperties = {
      left: `${(value / 1) * 80}%`, // 슬라이더 값에 따라 위치 조정
 
      transition: 'left 0.2s ease', // 위치 변화에 애니메이션 추가
      position: 'absolute', // CSSProperties 타입으로 인식되도록 수정
      top: '-30px', // Fire 이모지를 슬라이더 위로 위치 조정
    };


    const renderContent = () => {
      if (value <= 3) { 
        return (
          <div className="text-center p-4">
            <p className="text-2xl text-scampi-600 mb-4">힘든 하루를 보내셨군요.</p>
            <p className="text-2xl text-scampi-600 mb-4">기분 전환을 시작해볼까요?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors"
              >
                다시 측정하러가기
              </button>
              <Link to="/mydiary">
                <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
                  감정 체크 완료
                </button>
              </Link>
            </div>
          </div>
        );
      } else if (value <= 6) {
        return (
          <div className="text-center p-4">
            <p className="text-2xl text-scampi-600 mb-4">보통인 하루였군요.</p>
            <p className="text-2xl text-scampi-600 mb-4">잠시 여유를 즐겨보는 건 어떨까요?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors"
              >
                다시 측정하러가기
              </button>
              <Link to="/mydiary">
                <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
                  감정 체크 완료
                </button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div className="text-center p-4">
            <p className="text-2xl text-scampi-600 mb-4">오늘 정말 행복한 날이에요!</p>
            <p className="text-2xl text-scampi-600 mb-4">이 기분을 더 만끽해볼까요?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetry}
                className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors"
              >
                다시 측정하러가기
              </button>
              <Link to="/mydiary">
                <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
                  감정 체크 완료
                </button>
              </Link>
            </div>
          </div>
        );
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-between">
        {!submitted ? (
          <div className="text-center">
            <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-4">
              오늘의 에너지 레벨은?
            </h1>
            <p className="text-scampi-700 dark:text-scampi-300 text-sm font-medium font-['DM Sans'] leading-10">
              지금 내가 느끼는 활력 정도를 수치로 기록해봐요.
            </p>
            <div className="relative w-full mx-auto py-8">
              <div className="relative w-10 flex items-center justify-between">
                {/* Fire 이모지가 thumb 위치에 따라 움직이도록 스타일 적용 */}
                <img src={Fire} className="emoji-style" style={fireStyle} />
              </div>
              <div className="relative w-full mt-4" onClick={handleSliderClick}>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={value}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setValue(newValue);
                    onValueChange(newValue);
                  }}
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
                <span>0</span>
                <span>10</span>
              </div>
              <div className="text-center mt-4">
                <p className="text-4xl text-scampi-600">{value}</p>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
              >
                선택완료
              </button>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    );
  };
  
  export default EnergySlider;
