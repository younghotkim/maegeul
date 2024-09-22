import React, { useState } from "react";
import Shape from "../Icon/Slider Shape.png";

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  icon: string;
  iconSize: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min,
  max,
  icon,
  iconSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      const slider = e.currentTarget;
      const rect = slider.getBoundingClientRect();
      const newValue = Math.min(
        max,
        Math.max(
          min,
          ((e.clientX - rect.left) / rect.width) * (max - min) + min
        )
      );
      onChange(Math.round(newValue));
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  // 양 끝에서 위치 조정
  const calculateLeftPosition = () => {
    if (percentage <= 5) {
      return "0"; // 최소 값 근처일 때
    } else if (percentage >= 95) {
      return "calc(100% - 40px)"; // 최대 값 근처일 때 (아이콘 크기에 맞춰서 조정)
    } else {
      return `calc(${percentage}% - 20px)`; // 중간일 때
    }
  };

  return (
    <div
      className="relative w-[570px] h-24 mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ userSelect: "none" }}
    >
      {/* 슬라이더 배경 */}
      <div className="absolute w-full h-3 bg-black/10 rounded-full">
        <div
          className="h-full bg-violet-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Thumb를 눌러서 이동 가능하게 설정 */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="absolute w-full h-3 appearance-none bg-transparent cursor-pointer"
      />

      {/* Slider Shape와 Value 표시 */}
      <div
        className="absolute top-[-65px] transition-all duration-300 ease-out pointer-events-none"
        style={{ left: calculateLeftPosition() }} // 계산된 위치 사용
      >
        <img src={Shape} alt="Slider Shape" className="w-10 h-10 mb-2" />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
          {value}
        </span>
      </div>

      {/* 아이콘 이미지와 크기 */}
      <div
        className="absolute transition-all duration-300 ease-out pointer-events-none"
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          bottom: "1px",
          left: `calc(${percentage}% - ${iconSize / 2}px)`,
        }}
      >
        <img src={icon} alt="Icon" className="w-full h-full" />
      </div>

      {/* Thumb에 Shadow 효과 추가 및 클릭 가능하게 수정 */}
      <div
        className="absolute w-[47px] h-[47px] bg-white rounded-full shadow-lg transition-all duration-300 ease-out cursor-pointer"
        style={{ left: `calc(${percentage}% - 23.5px)`, top: "-17px" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default CustomSlider;
