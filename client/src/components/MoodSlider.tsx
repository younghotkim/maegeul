import React, { useState } from "react";
import Emoji_1 from "../Icon/emoji01.gif";
import Emoji_3 from "../Icon/emoji03.gif";
import Emoji_5 from "../Icon/emoji05.gif";
import Emoji_7 from "../Icon/emoji07.gif";
import Emoji_9 from "../Icon/emoji09.gif";
import Info from "../Icon/Info.png";
import Tooltip from "./Tooltip";
import ProgressBar from "./ProgressBar";
import CustomSlider from "./CustomSlider";

interface MoodSliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
}

const emojis = [
  { range: [1, 2], gif: Emoji_1 },
  { range: [3, 4], gif: Emoji_3 },
  { range: [5, 6], gif: Emoji_5 },
  { range: [7, 8], gif: Emoji_7 },
  { range: [9, 10], gif: Emoji_9 },
];

const MoodSlider: React.FC<MoodSliderProps> = ({ onValueChange, onSubmit }) => {
  const [value, setValue] = useState<number>(1);

  const handleSliderChange = (newValue: number) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  const currentEmoji = emojis.find(
    (emoji) => value >= emoji.range[0] && value <= emoji.range[1]
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="relative mb-8">
        <div className="absolute top-[-2rem] left-0 z-10 font-bold text-scampi-700 dark:text-scampi-300 font-['DM Sans'] leading-10">
          1단계: 감정 인식하기
        </div>
        <ProgressBar value={50} />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-black text-6xl font-black font-['Inter'] leading-10 dark:text-scampi-300 inline-flex items-center">
          오늘 나의 편안 지수는?
          <Tooltip message="오늘 나의 편안함 수치는 몇인가요? 만족감, 쾌적함, 기쁨 등 내가 느낀 긍정 감정의 정도를 기록해 봅시다.">
            <img src={Info} alt="Info" className="ml-2 cursor-pointer" />
          </Tooltip>
        </h1>
        <div className="text-center text-slate-500 text-xs font-medium font-['Plus Jakarta Sans'] leading-normal">
          지금 내가 느끼는 편안함, 얼마나 만족스럽고 쾌적한 상태인지 긍정 감정의
          정도를 측정해 봅시다.
        </div>
      </div>
      {/* 슬라이더 100px의 여백을 추가(mt-20) */}
      <div className="mt-20">
        <CustomSlider
          value={value}
          onChange={handleSliderChange}
          min={1}
          max={10}
          icon={currentEmoji ? currentEmoji.gif : ""}
          iconSize={32}
        />
      </div>
    </div>
  );
};

export default MoodSlider;
