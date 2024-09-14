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

interface MoodSliderProps {
  onValueChange: (value: number) => void;
  onSubmit: () => void;
}

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
            {
              //1또는 2일때, 삼항연산자 사용
              value === 1 || value === 2 ? (
                <img
                  src={Emoji_1}
                  className="emoji-style"
                  style={{ left: `${(2 / 10) * 100}%` }}
                /> // GIF
              ) : (
                <img
                  src={Stop_1}
                  className="emoji-style"
                  style={{ left: `${(2 / 10) * 100}%` }}
                />
              ) // PNG
            }
            {
              //3또는 4일때, 삼항연산자 사용
              value === 3 || value === 4 ? (
                <img
                  src={Emoji_3}
                  className="emoji-style"
                  style={{ left: `${(3 / 10) * 100}%` }}
                /> // GIF
              ) : (
                <img
                  src={Stop_3}
                  className="emoji-style"
                  style={{ left: `${(3 / 10) * 100}%` }}
                />
              ) // PNG
            }
            {
              //5또는 6일때, 삼항연산자 사용
              value === 5 || value === 6 ? (
                <img
                  src={Emoji_5}
                  className="emoji-style"
                  style={{ left: `${(5 / 10) * 100}%` }}
                /> // GIF
              ) : (
                <img
                  src={Stop_5}
                  className="emoji-style"
                  style={{ left: `${(5 / 10) * 100}%` }}
                />
              ) // PNG
            }
            {
              //7또는 8일때, 삼항연산자 사용
              value === 7 || value === 8 ? (
                <img
                  src={Emoji_7}
                  className="emoji-style"
                  style={{ left: `${(7 / 10) * 100}%` }}
                /> // GIF
              ) : (
                <img
                  src={Stop_7}
                  className="emoji-style"
                  style={{ left: `${(7 / 10) * 100}%` }}
                />
              ) // PNG
            }
            {
              //9또는 10일때, 삼항연산자 사용
              value === 9 || value === 10 ? (
                <img
                  src={Emoji_9}
                  className="emoji-style"
                  style={{ left: `${(9 / 10) * 100}%` }}
                /> // GIF
              ) : (
                <img
                  src={Stop_9}
                  className="emoji-style"
                  style={{ left: `${(9 / 10) * 100}%` }}
                />
              ) // PNG
            }
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
            {/* 슬라이더 구분 선 */}
            {/* <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mark) => (
                <div
                  key={mark}
                  className="slider-mark"
                  style={{ left: `${(mark / 11) * 100}%` }}
                ></div>
              ))}
            </div> */}
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
  );
};

export default MoodSlider;
