// EnergySlider.tsx
import React from "react";

const EnergySlider: React.FC<{ onValueChange: (value: number) => void }> = ({
  onValueChange,
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onValueChange(value); // 상태 업데이트
  };

  return (
    <input
      type="range"
      min="0"
      max="10"
      onChange={handleSliderChange} // 값이 변경될 때 상태 업데이트
    />
  );
};

export default EnergySlider;
