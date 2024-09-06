import React, { useState } from 'react';
import './MoodMeter.css';
import { moodData } from '../api/moodData';

const MoodMeter: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);  // 클릭된 좌표 저장
  };

  const getClassName = (index: number) => {
    if (selectedIndex === null) return ''; // 선택되지 않으면 기본 스타일

    const isAdjacent = (idx1: number, idx2: number) => {
      const row1 = Math.floor(idx1 / 10);
      const col1 = idx1 % 10;
      const row2 = Math.floor(idx2 / 10);
      const col2 = idx2 % 10;

      // 상하좌우 위치 확인
      return (
        (row1 === row2 && Math.abs(col1 - col2) === 1) || // 좌우 인접
        (col1 === col2 && Math.abs(row1 - row2) === 1)    // 상하 인접
      );
    };

    // 선택된 좌표이거나 인접 좌표에 추가 스타일 적용
    if (index === selectedIndex || isAdjacent(selectedIndex, index)) {
      return 'highlighted';
    }

    return '';
  };

  return (
    <div className="mood-container">
      <div className="grid-container">
        {moodData.map((mood, index) => (
          <div
            key={index}
            className={`grid-item ${getClassName(index)}`}
            style={{ backgroundColor: mood.color }}
            onClick={() => handleClick(index)}  // 클릭 시 좌표 저장
          >
            {mood.label && (
              <>
                <div className="mood-label">{mood.label}</div>
                <div className="mood-details">
                  Energy: {mood.energy} <br />
                  Pleasantness: {mood.pleasantness}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodMeter;
