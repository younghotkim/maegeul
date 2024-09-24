import React, { useState } from "react";
import Fire from "../Icon/fire.gif";
import Info from "../Icon/Info.png";
import Tooltip from "./Tooltip";
import CustomSlider from "./CustomSlider";

interface EnergySliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
}

const EnergySlider: React.FC<EnergySliderProps> = ({
  onValueChange,
  onSubmit,
}) => {
  const [value, setValue] = useState<number>(1);

  const handleSliderChange = (newValue: number) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  const fireSize = 48 + value * 3; // 슬라이더 값에 따라 이모지 크기 조정

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="text-center mb-8">
        {/* 텍스트 섹션 */}
        <h1
          className="text-black text-6xl font-black font-['Inter'] leading-10
            mb-9 dark:text-scampi-300 inline-flex items-center"
        >
          오늘 나의 에너지 레벨은?
          <Tooltip message="오늘 나의 에너지 레벨은 몇인가요? 활성화 정도를 뜻하는 이 영역에서는 오늘 나의 각성, 흥분 정도를 기록해요.">
            <img src={Info} alt="Info" className="ml-2 cursor-pointer" />
          </Tooltip>
        </h1>
        <div className="text-center text-slate-500 text-xs font-medium font-['plus-jakarta-sans'] leading-normal">
          지금 내가 느끼는 활력 정도를 수치로 기록해봐요.
        </div>
      </div>

      {/* 슬라이더 100px의 여백을 추가(mt-20) */}
      <div className="mt-20">
        <CustomSlider
          value={value}
          onChange={handleSliderChange}
          min={1}
          max={10}
          icon={Fire}
          iconSize={fireSize}
        />
      </div>
      <div className="text-center mt-8">
        <button
          onClick={onSubmit}
          className="rounded-xl border border-violet-500 dark:bg-scampi-600 text-violet-500 py-2 px-10 shadow-md
           hover:bg-scampi-400 hover:text-white dark:hover:bg-scampi-700 transition-colors
          font-bold font-['plus-jakarta-sans'] leading-normal"
        >
          측정 완료하기
        </button>
      </div>
    </div>
  );
};

export default EnergySlider;
