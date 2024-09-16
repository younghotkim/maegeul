import React, { useState, useEffect } from "react";
import "./MoodMeter.css"; // CSS 파일
import { moodData } from "../api/moodData"; // moodData import

interface MoodMeterProps {
  pleasantness: number;
  energy: number;
  onColorChange: (color: string) => void; // color 전달을 위한 함수
  onHighlightChange: (labels: string[]) => void; // highlight된 labels 전달
}

const MoodMeter: React.FC<MoodMeterProps> = ({
  pleasantness,
  energy,
  onColorChange,
  onHighlightChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedLabels, setHighlightedLabels] = useState<string[]>([]);

  // 전달받은 pleasantness와 energy 값을 기반으로 좌표 계산
  const findMoodIndex = (pleasantness: number, energy: number) => {
    return (10 - energy) * 10 + (pleasantness - 1);
  };

  useEffect(() => {
    const selectedMoodIndex = findMoodIndex(pleasantness, energy);

    // setSelectedIndex가 같은 값을 다시 설정하지 않도록 조건 추가
    if (selectedMoodIndex !== selectedIndex) {
      setSelectedIndex(selectedMoodIndex);
    }

    // 선택된 인덱스의 color를 부모 컴포넌트로 전달
    const selectedMood = moodData[selectedMoodIndex];
    if (selectedMood) {
      onColorChange(selectedMood.color);
    }

    // 인접한 무드와 함께 highlight된 무드의 라벨을 추출하여 부모 컴포넌트로 전달
    const adjacentLabels = moodData
      .filter((_, idx) => getClassName(idx).includes("highlighted"))
      .map((mood) => mood.label);

    // setHighlightedLabels가 동일한 값을 다시 설정하지 않도록 조건 추가
    if (adjacentLabels.join(",") !== highlightedLabels.join(",")) {
      setHighlightedLabels(adjacentLabels);
      onHighlightChange(adjacentLabels);
    }
  }, [
    pleasantness,
    energy,
    onColorChange,
    onHighlightChange,
    selectedIndex,
    highlightedLabels,
  ]);

  const getClassName = (index: number) => {
    if (selectedIndex === null) return ""; // 선택되지 않으면 기본 스타일

    const isAdjacent = (idx1: number, idx2: number) => {
      const row1 = Math.floor(idx1 / 10);
      const col1 = idx1 % 10;
      const row2 = Math.floor(idx2 / 10);
      const col2 = idx2 % 10;

      // 상하좌우 위치 확인 (인접한 셀)
      return (
        (row1 === row2 && Math.abs(col1 - col2) === 1) || // 좌우 인접
        (col1 === col2 && Math.abs(row1 - row2) === 1) // 상하 인접
      );
    };

    // 선택된 좌표이거나 인접 좌표에 추가 스타일 적용
    if (index === selectedIndex || isAdjacent(selectedIndex, index)) {
      return "highlighted"; // CSS로 강조
    }

    return "";
  };

  return (
    <div className="grid-container">
      {moodData.map((mood, index) => (
        <div
          key={index}
          className={`grid-item ${getClassName(index)} ${
            index === selectedIndex ? "selected" : ""
          }`} // 선택된 좌표에 특별한 클래스 적용
          style={{ backgroundColor: mood.color }} // 배경색 설정
        >
          {mood.label && (
            <>
              <div className="mood-label">{mood.label}</div> {/* 라벨 표시 */}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoodMeter;
