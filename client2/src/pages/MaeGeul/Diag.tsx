import React, { useState } from "react";
import MoodSlider from "../../components/MoodSlider";
import EnergySlider from "../../components/EnergySlider";
import MoodMeter from "../../components/MoodMeter"; // MoodMeter 컴포넌트 추가
import { Link } from "react-router-dom";

const Diag: React.FC = () => {
  const [moodValue, setMoodValue] = useState<number>(1); // 초기값 1로 설정
  const [energyValue, setEnergyValue] = useState<number>(1); // 초기값 1로 설정
  const [submitted, setSubmitted] = useState(false);
  const [highlightedColor, setHighlightedColor] = useState<string | null>(null); // 선택된 color 상태 추가
  const [highlightedLabels, setHighlightedLabels] = useState<string[]>([]); // highlight된 라벨 상태 추가

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
    setMoodValue(value); // pleasantness 값 저장
  };

  const handleEnergyChange = (value: number) => {
    setEnergyValue(value); // energy 값 저장
  };

  const handleSubmit = () => {
    setSubmitted(true); // 값이 있으면 제출
  };

  const handleRetry = () => {
    setSubmitted(false); // 다시 측정할 때 상태 초기화
    setMoodValue(1); // 초기값 1로 설정
    setEnergyValue(1); // 초기값 1로 설정
  };

  // MoodMeter에서 전달받은 color를 업데이트하는 함수
  const handleColorChange = (color: string) => {
    setHighlightedColor(color); // 선택된 color 저장
  };

  // MoodMeter에서 highlight된 라벨들을 업데이트하는 함수
  const handleHighlightChange = (labels: string[]) => {
    setHighlightedLabels(labels); // highlight된 라벨 저장
  };

  // 제출된 경우 표시할 내용
  if (submitted) {
    const colorName = highlightedColor ? getColorName(highlightedColor) : "";

    return (
      <div className="text-center p-4">
        <p className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-6">
          오늘 린다님의 무드 컬러는 {colorName}
          {highlightedColor && (
            <span
              style={{
                display: "inline-block",
                width: "35px",
                height: "35px",
                backgroundColor: highlightedColor,
                marginLeft: "5px",
                borderRadius: "3px", // 정사각형 모양의 박스
              }}
            />
          )}
          이에요.
        </p>

        {highlightedLabels.length > 0 && (
          <p className="text-scampi-700 dark:text-scampi-300 text-2xl font-bold font-['DM Sans'] leading-10 mb-6">
            #{highlightedLabels.join("#")}
          </p>
        )}
        <div className="mt-8 mb-8">
          <MoodMeter
            pleasantness={moodValue}
            energy={energyValue}
            onColorChange={handleColorChange}
            onHighlightChange={handleHighlightChange}
          />
        </div>
        <div className="w-full p-6 ml-10 mr-10 bg-slate-100 rounded-3xl flex justify-center items-center mt-8">
          <p className="text-scampi-700 text-lg font-bold font-['DM Sans'] leading-7 text-center">
            내 감정을 더욱 정확하게 알아보기 위해서, <br />
            지금 바로 감정 일기를 작성하러 가볼까요?
          </p>
        </div>
        <div className="flex justify-center gap-4 p-6">
          <button
            onClick={handleRetry}
            className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors"
          >
            다시 측정하기
          </button>
          <Link to="/MgWriting">
            <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
              글쓰러가기
            </button>
          </Link>
        </div>
      </div>
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
