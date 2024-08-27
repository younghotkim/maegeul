// src/components/MoodSlider.tsx
import React, { useState } from 'react';
import './MoodSlider.css'; // 커스텀 스타일을 위한 CSS 파일 추가
import { Link } from 'react-router-dom'; // 글쓰기 페이지 이동

const MoodSlider: React.FC = () => {
  const [value, setValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setValue(0);
  };

  const handleEmotionCheck = () => {
    alert('🥲글쓰기 기능은 아직 공사중이에요.🔧');
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    let newValue = Math.round((offsetX / rect.width) * 10);
  
    // newValue가 0 미만이거나 10을 초과할 수 없도록 합니다.
    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;
  
    setValue(newValue);
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Math.min(10, Number(e.target.value)));
    setValue(newValue);
  };
  

  const renderContent = () => {
    if (value <= 3) {
      return (
        <div className="text-center p-4">
          <p className="text-2xl text-scampi-600 mb-4">힘든 하루를 보내셨군요.</p>
          <p className="text-2xl text-scampi-600 mb-4">기분 전환을 시작해볼까요?</p>
          <div className="flex justify-center gap-4">
          <button onClick={handleRetry} className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            다시 측정하러가기</button>
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
          <button onClick={handleRetry} className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            다시 측정하러가기</button>
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
            <button onClick={handleRetry} className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
            다시 측정하러가기</button>
            <Link to="/mydiary">
          <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
          감정 체크 완료
          </button>
        </Link></div>
        </div>
      );
    }
  };

  return (
    <div className="w-3/4 mx-auto py-8">
      {!submitted ? (
        <div className="text-center">
          <div className="relative w-full" onClick={handleSliderClick}>
            <input
              type="range"
              min="0"
              max="10"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="mood-slider" // External CSS for custom slider styles
            />
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between">
              {[3, 6, 9].map((mark) => (
                <div key={mark} className="slider-mark" style={{ left: `${(mark / 10) * 100}%` }}></div>
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
          <button onClick={handleSubmit} className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">선택완료</button>
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default MoodSlider;
