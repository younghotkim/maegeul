import React, { useEffect, useState } from "react";
import MoodSlider from "../../components/MoodSlider";
import EnergySlider from "../../components/EnergySlider";
import MoodMeter from "../../components/MoodMeter";
import { Link } from "react-router-dom";
import { useHighlightContext } from "../../context/HighlightContext"; // Context 임포트
import { useUser } from "../../context/UserContext"; // UserContext 임포트
import ProgressBar from "../../components/ProgressBar";

const Diag: React.FC = () => {
  const [moodValue, setMoodValue] = useState<number>(1);
  const [energyValue, setEnergyValue] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);

  // UserContext에서 사용자 정보 가져오기
  const { user } = useUser();

  // HighlightContext 사용
  const {
    highlightedLabels,
    setHighlightedLabels,
    highlightedColor,
    setHighlightedColor,
  } = useHighlightContext();

  // RGB 값에 따른 색상 이름 반환 함수
  const getColorName = (rgb: string) => {
    switch (rgb) {
      case "rgb(223,32,32)":
        return "빨간색";
      case "rgb(255,209,87)":
        return "노란색";
      case "rgb(53,80,155)":
        return "파란색";
      case "rgb(147,196,125)":
        return "초록색";
      default:
        return "알 수 없는 색상";
    }
  };

  const handleMoodChange = (value: number) => {
    setMoodValue(value);
  };

  const handleEnergyChange = (value: number) => {
    setEnergyValue(value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setMoodValue(1);
    setEnergyValue(1);
  };

  // MoodMeter에서 전달받은 color를 업데이트하는 함수
  const handleColorChange = (color: string) => {
    setHighlightedColor(color); // Context의 setHighlightedColor 사용
  };

  // MoodMeter에서 highlight된 라벨들을 업데이트하는 함수
  const handleHighlightChange = (labels: string[]) => {
    setHighlightedLabels(labels); // Context의 setHighlightedLabels 사용
  };

  // 제출된 경우 표시할 내용
  if (submitted) {
    const colorName = highlightedColor ? getColorName(highlightedColor) : "";

    return (
      <>
        <div className="w-[1140px] relative mt-10 mx-auto">
          {/* 텍스트 (ProgressBar 왼쪽 끝에 위치) */}
          <div className="absolute top-[-2rem] left-0 z-10 font-bold text-scampi-700 dark:text-scampi-300 font-['font-plus-jakarta-sans'] leading-10">
            2단계: 감정 이해하기
          </div>
          {/* Progress Bar (가운데에 위치) */}
          <div className="w-full flex justify-center">
            <ProgressBar value={50} />
          </div>
        </div>
        <div className="text-center p-4">
          <p className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['font-plus-jakarta-sans'] leading-10 mt-3">
            오늘 {user?.profile_name}님의 무드 컬러는 {colorName}
            {highlightedColor && (
              <span
                style={{
                  display: "inline-block",
                  width: "35px",
                  height: "35px",
                  backgroundColor: highlightedColor,
                  marginLeft: "5px",
                  borderRadius: "3px",
                }}
              />
            )}
            이에요.
          </p>

          {highlightedLabels.length > 0 && (
            <p className="text-scampi-700 dark:text-scampi-300 text-2xl font-bold font-['Inter'] leading-10 mt-2">
              #{highlightedLabels.join("#")}
            </p>
          )}
          <div className="flex justify-center items-center mt-10">
            <MoodMeter
              pleasantness={moodValue}
              energy={energyValue}
              onColorChange={handleColorChange}
              onHighlightChange={handleHighlightChange}
            />
          </div>
          <div className="w-full bg-slate-100 rounded-3xl flex justify-center items-center mt-10">
            <p className="text-scampi-700 text-lg font-bold font-['font-plus-jakarta-sans'] text-center">
              내 감정을 더욱 정확하게 알아보기 위해서, <br />
              지금 바로 감정 일기를 작성하러 가볼까요?
            </p>
          </div>
          <div className="flex justify-center gap-4 p-0 mt-0">
            {" "}
            {/* 패딩과 마진 값 제거 */}
            <button
              onClick={handleRetry}
              className="font-['font-plus-jakarta-sans'] text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 
    hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors"
            >
              다시 측정하기
            </button>
            <Link to="/MgWriting">
              <button className="font-['font-plus-jakarta-sans'] bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
                글쓰러가기
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // 제출되지 않은 경우 슬라이더 표시
  return (
    <div className="flex flex-col items-center">
      <MoodSlider onValueChange={handleMoodChange} onSubmit={handleSubmit} />
      <EnergySlider
        onValueChange={handleEnergyChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Diag;
