//src/components/MoodSlider.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const MoodSlider: React.FC = () => {
  const [value, setValue] = useState(3);

  return (
    <SliderContainer>
      <Slider
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <SliderValue>{value}</SliderValue>
    </SliderContainer>
  );
};

export default MoodSlider;

const SliderContainer = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const Slider = styled.input`
  width: 100%;
  appearance: none;
  background: #dcdcdc;
  height: 5px;
  border-radius: 5px;
  outline: none;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    background: #6c6783;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SliderValue = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #6c6783;
`;
