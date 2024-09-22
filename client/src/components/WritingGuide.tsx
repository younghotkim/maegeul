//src/components/WritingGuide.tsx
import React, { useState } from "react";
import Info from "../Icon/Info.png";
import Tooltip from "./Tooltip";
import "./WritingGuide.css";

const WritingGuide: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // 각 버튼에 따라 표시될 가이드 텍스트를 정의
  const guideTexts: { [key: string]: JSX.Element } = {
    measure: (
      <p className="guide-text">
        매글에서는 러셀 모델을 기반으로 감정을 측정해요.
        <br />
        쾌적함-에너지정도(Balance-Arousal)를 기록하면 현재 느끼는 감정을
        "무드컬러"로 알아볼 수 있어요.
      </p>
    ),
    diary: (
      <p className="guide-text">
        오늘 나의 감정을 만든 구체적인 상황과 그때 나의 생각, 행동은
        <br />
        어땠나요? 감정일기를 통해 더 세밀하게 나의 마음을 살펴요.
      </p>
    ),
    aiCheck: (
      <p className="guide-text">
        오늘 나의 감정을 만든 구체적인 상황과 그때 나의 생각, 행동은
        <br />
        어땠나요? 감정일기를 통해 더 세밀하게 나의 마음을 살펴요.
      </p>
    ),
  };

  const toggleGuide = (buttonType: string) => {
    setActiveButton((prevActive) =>
      prevActive === buttonType ? null : buttonType
    );
  };

  return (
    <div className="writing-guide-container">
      {/* 버튼 부분 */}
      <div className="button-container">
        <button
          onClick={() => toggleGuide("measure")}
          className={`guide-button ${
            activeButton === "measure" ? "active" : ""
          }`}
        >
          <span>기분 수치 측정</span>
        </button>
        <button
          onClick={() => toggleGuide("diary")}
          className={`guide-button ${activeButton === "diary" ? "active" : ""}`}
        >
          <span>감정 일기 작성</span>
        </button>
        <button
          onClick={() => toggleGuide("aiCheck")}
          className={`guide-button ${
            activeButton === "aiCheck" ? "active" : ""
          }`}
        >
          <span>AI 하루 진단</span>
        </button>
      </div>

      {/* 가이드 텍스트 부분 */}
      <div className={`guide-content ${activeButton ? "visible" : ""}`}>
        {activeButton ? guideTexts[activeButton] : null}
      </div>
    </div>
  );
};

export default WritingGuide;
