import React, { useState } from "react";
import "./MoodSlider.css";
import Emoji_1 from "../Icon/emoji01.gif";
import Stop_1 from "../Icon/Emoji01.png";
import Emoji_3 from "../Icon/emoji03.gif";
import Stop_3 from "../Icon/Emoji03.png";
import Emoji_5 from "../Icon/emoji05.gif";
import Stop_5 from "../Icon/Emoji05.png";
import Emoji_7 from "../Icon/emoji07.gif";
import Stop_7 from "../Icon/Emoji07.png";
import Emoji_9 from "../Icon/emoji09.gif";
import Stop_9 from "../Icon/Emoji09.png";
import Info from "../Icon/Info.png";
import Tooltip from "./Tooltip";
import ProgressBar from "./ProgressBar";

interface MoodSliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
}

const emojis = [
  { range: [1, 2], gif: Emoji_1, png: Stop_1 },
  { range: [3, 4], gif: Emoji_3, png: Stop_3 },
  { range: [5, 6], gif: Emoji_5, png: Stop_5 },
  { range: [7, 8], gif: Emoji_7, png: Stop_7 },
  { range: [9, 10], gif: Emoji_9, png: Stop_9 },
];

const MoodSlider: React.FC<MoodSliderProps> = ({ onValueChange, onSubmit }) => {
  const [value, setValue] = useState<number>(1);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange(newValue); // 부모 컴포넌트에 값 전달
  };

  const handleSubmit = () => {
    onValueChange(value);
    onSubmit();
  };

  return (
    <>
      <div className="w-[1140px] relative mt-10">
        {/* 텍스트 (ProgressBar 위에 위치) */}
        <div className="absolute top-[-2rem] left-0 z-10 font-bold text-scampi-700 dark:text-scampi-300 font-bold font-['DM Sans'] leading-10">
          1단계: 감정 인식하기
        </div>
        {/* Progress Bar */}
        <ProgressBar value={50} />
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="text-center mt-8">
          <h1 className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 inline-flex items-center">
            오늘의 편안함 정도는?
            <Tooltip message="오늘 나의 편안함 수치는 몇인가요? 만족감, 쾌적함, 기쁨 등 내가 느낀 긍정 감정의 정도를 기록해 봅시다.">
              <img src={Info} alt="Info" className="ml-2 cursor-pointer" />
            </Tooltip>
          </h1>
          <p className="text-scampi-700 dark:text-scampi-300 text-sm font-medium font-['DM Sans'] leading-10">
            지금 내가 느끼는 편안한 정도를 수치로 기록해봐요.
          </p>
          <div className="relative w-full mx-auto py-8">
            <div className="relative w-20 flex items-center justify-between gap-20">
              {/* 배열을 순회하며 삼항연산자 대신 .map() 함수를 사용하여 이미지 소스와 위치를 동적으로 설정 */}
              {emojis.map(({ range, gif, png }, index) => (
                <img
                  key={index}
                  src={value >= range[0] && value <= range[1] ? gif : png}
                  className="emoji-style"
                  style={{ left: `${((range[0] + range[1]) / 2 / 10) * 100}%` }}
                  alt={`emoji-${range[0]}`}
                />
              ))}
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
            </div>
            <div className="flex justify-between text-scampi-700 mt-4">
              <span>1</span>
              <span>10</span>
            </div>
            <div className="text-center mt-4">
              <p className="text-4xl text-scampi-600">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodSlider;
