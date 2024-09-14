import React, { useState } from "react";
import "./MoodSlider.css"; // 커스텀 스타일을 위한 CSS 파일 추가
import Fire from "../Icon/fire.gif";
import ArrowWhite from "../Icon/Arrow White.png";
import Info from "../Icon/Info.png";
import Tooltip from "./Tooltip";

interface EnergySliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void; // 제출 함수만 부모로부터 받음
}

const EnergySlider: React.FC<EnergySliderProps> = ({
  onValueChange,
  onSubmit,
}) => {
  const [value, setValue] = useState<number>(1);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange(newValue); // 부모 컴포넌트에 값 전달
  };

  const handleSubmit = () => {
    onSubmit(); // 제출 처리만 부모 컴포넌트에서 실행
  };

  const fireSize = 20 + (value - 1) * 2; // 슬라이더 값에 따라 이모지 크기 조정
  const fireStyle: React.CSSProperties = {
    left: `${value * 100}%`,
    transition: "left 0.2s ease",
    position: "absolute",
    top: "-30px",
    width: `${fireSize}px`,
    height: `${fireSize}px`,
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="text-center">
        <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 inline-flex items-center">
          오늘의 에너지 레벨은?
          <Tooltip message="오늘 나의 에너지 레벨은 몇인가요? 활성화 정도를 뜻하는 이 영역에서는 오늘 나의 각성, 흥분 정도를 기록해요.">
            <img src={Info} alt="Info" className="ml-2 cursor-pointer" />
          </Tooltip>
        </h1>
        <p className="text-scampi-700 dark:text-scampi-300 text-sm font-medium font-['DM Sans'] leading-10">
          지금 내가 활력 정도를 수치로 기록해봐요.
        </p>
        <div className="relative w-full mx-auto py-8">
          <div className="relative w-10 flex ">
            <img src={Fire} className="emoji-style" style={fireStyle} />
          </div>
          <div className="relative w-full mt-4">
            <input
              type="range"
              min="1"
              max="10"
              value={value}
              onChange={handleSliderChange}
              className="mood-slider"
            />
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mark) => (
                <div
                  key={mark}
                  className="slider-mark"
                  style={{ left: `${(mark / 10) * 100}%` }}
                ></div>
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
            className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-10 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
          >
            측정완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnergySlider;
