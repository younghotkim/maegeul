import React, { useState } from "react";
import { motion } from "framer-motion"; // framer-motion 추가
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
  onChange,
  min,
  max,
  icon,
  iconSize,
}) => {
  // 초기값을 5로 설정
  const [value, setValue] = useState(5);
  const [isDragging, setIsDragging] = useState(false); // isDragging 상태 추가

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
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
      setValue(Math.round(newValue));
      onChange(Math.round(newValue));
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  // 위치 계산: Thumb와 Slider Value가 동일하게 중앙에 오도록 설정
  const calculateLeftPosition = () => {
    return `calc(${percentage}% - 23.5px)`; // Thumb와 값의 크기 맞춰 위치 조정
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
        <motion.div
          className="h-full bg-violet-300 rounded-full"
          style={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1, ease: "easeOut" }} // 애니메이션 속도 더 빠르게
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
      <motion.div
        className="absolute top-[-65px] transition-all duration-300 ease-out pointer-events-none"
        style={{ left: calculateLeftPosition() }}
        animate={{ left: calculateLeftPosition() }}
        transition={{
          type: "spring",
          stiffness: 500, // 스프링 탄성
          damping: 30, // 스프링 감속
        }} // 빠르고 부드러운 애니메이션 적용
      >
        <img src={Shape} alt="Slider Shape" className="w-10 h-10 mb-2" />
        <span className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
          {value}
        </span>
      </motion.div>

      {/* 아이콘 이미지와 크기 */}
      <motion.div
        className="absolute transition-all duration-300 ease-out pointer-events-none"
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          bottom: "1px",
          left: `calc(${percentage}% - ${iconSize / 2}px)`,
        }}
        animate={{ left: `calc(${percentage}% - ${iconSize / 2}px)` }}
        transition={{
          type: "spring",
          stiffness: 500, // 스프링 탄성
          damping: 30, // 빠른 반응을 위한 스프링 효과
        }}
      >
        <img src={icon} alt="Icon" className="w-full h-full" />
      </motion.div>

      {/* Thumb에 Shadow 효과 추가 및 클릭 가능하게 수정 */}
      <motion.div
        className="absolute w-[47px] h-[47px] bg-violet-300 rounded-full shadow-lg transition-all ease-out cursor-pointer"
        style={{ left: calculateLeftPosition(), top: "-17px" }}
        animate={{ left: calculateLeftPosition() }}
        transition={{
          type: "spring",
          stiffness: 500, // thumb이 빠르게 따라가도록 설정
          damping: 30, // 스프링 감속
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default CustomSlider;
function setIsDragging(arg0: boolean) {
  throw new Error("Function not implemented.");
}
