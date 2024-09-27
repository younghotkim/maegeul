import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MoodMeter.css";
import { moodData } from "../api/moodData";

interface MoodMeterProps {
  pleasantness: number;
  energy: number;
  onColorChange: (color: string) => void;
  onHighlightChange: (labels: string[]) => void;
}

const MoodMeter: React.FC<MoodMeterProps> = ({
  pleasantness,
  energy,
  onColorChange,
  onHighlightChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedLabels, setHighlightedLabels] = useState<string[]>([]);

  const findMoodIndex = (pleasantness: number, energy: number) => {
    return (10 - energy) * 10 + (pleasantness - 1);
  };

  useEffect(() => {
    const selectedMoodIndex = findMoodIndex(pleasantness, energy);

    if (selectedMoodIndex !== selectedIndex) {
      setSelectedIndex(selectedMoodIndex);
    }

    const selectedMood = moodData[selectedMoodIndex];
    if (selectedMood) {
      onColorChange(selectedMood.color);
    }

    const adjacentLabels = moodData
      .filter((_, idx) => getClassName(idx).includes("highlighted"))
      .map((mood) => mood.label);

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
    if (selectedIndex === null) return "";

    const isAdjacent = (idx1: number, idx2: number) => {
      const row1 = Math.floor(idx1 / 10);
      const col1 = idx1 % 10;
      const row2 = Math.floor(idx2 / 10);
      const col2 = idx2 % 10;

      return (
        (row1 === row2 && Math.abs(col1 - col2) === 1) ||
        (col1 === col2 && Math.abs(row1 - row2) === 1)
      );
    };

    if (index === selectedIndex || isAdjacent(selectedIndex, index)) {
      return "highlighted";
    }

    return "";
  };

  return (
    <div className="grid-container">
      {moodData.map((mood, index) => (
        <motion.div
          key={index}
          className={`grid-item ${getClassName(index)} ${
            index === selectedIndex ? "selected" : ""
          }`}
          style={{ backgroundColor: mood.color }}
          initial={{ opacity: 0 }} // 단순한 페이드인 효과
          animate={{ opacity: 1 }} // 최종 상태는 투명도 1
          transition={{ duration: 1.6 }} // 부드럽고 느린 애니메이션
          whileHover={{ scale: 1.05 }} // 마우스 오버 시 살짝만 커짐
        >
          {mood.label && <div className="mood-label">{mood.label}</div>}
        </motion.div>
      ))}
    </div>
  );
};

export default MoodMeter;
