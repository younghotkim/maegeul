import React, { useState } from "react";
import EnergySlider from "./EnergySlider";
import MoodSlider from "./MoodSlider";
import MoodMeter from "./MoodMeter";

const MoodMeterContainer: React.FC = () => {
  const [pleasantness, setPleasantness] = useState<number>(1); // 초기값 1로 설정
  const [energy, setEnergy] = useState<number>(1); // 초기값 1로 설정
  const [highlightedLabels, setHighlightedLabels] = useState<string[]>([]); // 강조된 라벨 상태 관리

  // pleasantness 값이 변경될 때 호출
  const handlePleasantnessChange = (value: number) => {
    setPleasantness(value);
  };

  // energy 값이 변경될 때 호출
  const handleEnergyChange = (value: number) => {
    setEnergy(value);
  };

  // MoodMeter에서 강조된 라벨이 변경되면 호출
  const handleHighlightChange = (labels: string[]) => {
    setHighlightedLabels(labels);
  };

  // 제출 조건: 두 값이 모두 입력되면 MoodMeter를 표시
  if (pleasantness !== null && energy !== null) {
    return (
      <div>
        <MoodMeter
          pleasantness={pleasantness}
          energy={energy}
          onHighlightChange={handleHighlightChange} // 강조된 라벨 처리 핸들러 전달
          onColorChange={function (color: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        {/* 강조된 라벨들 표시 */}
        <div className="highlighted-labels">
          <h3>Highlighted Labels:</h3>
          <ul>
            {highlightedLabels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // 아직 제출되지 않은 경우 슬라이더 표시
  return (
    <div>
      {/* EnergySlider에 onValueChange 및 기타 props 전달 */}
      <EnergySlider
        onValueChange={handleEnergyChange}
        onSubmit={() => {}} // onSubmit은 더 이상 필요하지 않음
      />
      {/* MoodSlider에 onValueChange 및 기타 props 전달 */}
      <MoodSlider
        onValueChange={handlePleasantnessChange}
        onSubmit={() => {}} // onSubmit은 더 이상 필요하지 않음
      />
    </div>
  );
};

export default MoodMeterContainer;
