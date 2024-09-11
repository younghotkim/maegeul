import React from "react";
import EnergySlider from "./EnergySlider";
import MoodSlider from "./MoodSlider";
import MoodMeter from "./MoodMeter";
import { useMoodContext } from "../context/MoodContext"; // Context 훅 임포트

const MoodMeterContainer: React.FC = () => {
  const { pleasantness, energy, setPleasantness, setEnergy } = useMoodContext(); // 전역 상태 사용

  return (
    <div>
      <EnergySlider
        onValueChange={setEnergy}
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <MoodSlider
        onValueChange={setPleasantness}
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* MoodMeter를 슬라이더 값에 따라 표시 */}
      {pleasantness !== null && energy !== null && (
        <MoodMeter
          pleasantness={pleasantness}
          energy={energy}
          onHighlightChange={(labels: string[]) => {}}
          onColorChange={(color: string) => {}}
        />
      )}
    </div>
  );
};

export default MoodMeterContainer;
