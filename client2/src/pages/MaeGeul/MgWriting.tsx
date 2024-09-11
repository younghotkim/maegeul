import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { analyzeEmotion } from "../../api/analyzeApi"; // 분석 API import
import WritingGuide from "../../components/WritingGuide"; // 왼쪽 감정 일기 가이드
import PencilWriting from "../../Icon/Pencil Writing.png";
import Folder from "../../Icon/Folder.png";
import MgModal from "./MgModal"; // 모달 컴포넌트 임포트
import { useHighlightContext } from "../../context/HighlightContext"; // Context 임포트
import { useMoodContext } from "../../context/MoodContext"; // Context 훅 임포트

const MgWriting: React.FC = () => {
  const [content, setContent] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [emotionResult, setEmotionResult] = useState<string | null>(null); // 분석 결과 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const maxLength = 500;
  const { highlightedLabels, highlightedColor } = useHighlightContext(); // 강조된 라벨과 색상 가져오기
  const { pleasantness, energy } = useMoodContext();

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

  useEffect(() => {
    const today = new Date();
    const formatted = `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;
    setFormattedDate(formatted);
  }, []);

  const [title, setTitle] = useState(`${formattedDate}의 일기`); // 템플릿 리터럴로 초기값 설정

  useEffect(() => {
    // formattedDate가 변경될 때 title도 업데이트
    setTitle(`${formattedDate}의 일기`);
  }, [formattedDate]);

  const handleSave = async () => {
    try {
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      const newPost = { title, content, date: formattedDate };
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      alert("글이 저장되었습니다!");
      setTitle(""); // 제목 초기화
      setContent(""); // 내용 초기화

      // AI 분석 여부 확인
      if (window.confirm("AI 분석을 하시겠습니까?")) {
        const emotion = await analyzeEmotion(content); // 감정 분석 호출
        setEmotionResult(emotion); // 분석 결과 상태 저장
        alert(`감정 분석 결과: ${emotion}`);
      }
    } catch (error) {
      console.error("글 저장 중 오류 발생:", error);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true); // 모달을 열기 위한 함수
  };

  const handleModalClose = () => {
    setShowModal(false); // 모달을 닫기 위한 함수
  };

  const colorName = highlightedColor ? getColorName(highlightedColor) : "";

  return (
    <>
      <Header />
      <div className="flex w-full h-screen p-10 bg-gray-100 dark:bg-gray-600">
        {/* 왼쪽 가이드 */}

        <div className="w-1/2 h-full p-8 bg-white rounded-3xl shadow-md dark:bg-gray-700">
          <div className="User w-96 h-11 text-scampi-800 font-bold text-2xl leading-10 dark:text-white">
            무디타의 감정일기 가이드
          </div>
          <div className="Container flex flex-col space-y-2">
            <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10">
              <div className="text-zinc-800 text-lg">
                작성 안내
                <br />
                <br />
                1. 감정을 느낀 구체적인"상황"과 그 때 나의 "행동", "생각"을
                포함해 적어보세요.
                <br />
                2. 조금씩이라도 매일 꾸준히 적다보면 나의 마음을 건강하게
                변화시켜갈 수 있어요.
                <br />
                3. 감정을 느꼈을 때 나의 신체적 변화에 대해서 적어보는 것도
                도움이 되어요.
              </div>
            </div>

            <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10">
              <div className="text-zinc-800 text-lg">
                <div className="mt-5 text-gray-700 dark:text-gray-300">
                  나의 무드미터
                  <br />
                  오늘의 무드 컬러: {colorName}
                  {highlightedColor && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: highlightedColor,
                        borderRadius: "3px",
                      }}
                    />
                  )}
                  <br />
                  감정 키워드:
                  <br />
                  <br />
                  {highlightedLabels.map((label) => (
                    <span
                      key={label}
                      className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-3 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors ml-1"
                    >
                      {label}
                    </span>
                  ))}
                  <br />
                  오늘 린다님이 기록한 편안 지수는 {pleasantness}, 에너지 지수는{" "}
                  {energy}이었어요.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 작성 부분 */}
        <div className="w-1/2 h-full p-8 bg-white rounded-3xl shadow-md dark:bg-gray-700 flex flex-col justify-between">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                {title}
              </h1>
              <span className="text-sm text-neutral-500">{formattedDate}</span>
            </div>
            <textarea
              className="w-full h-[400px] text-lg mt-4 p-4 border border-transparent rounded-lg resize-none dark:bg-gray-600 dark:text-white"
              placeholder="오늘 하루 어떠셨나요? 오늘 내가 느낀 감정을 일으킨 상황과 함께 구체적으로 작성해보세요."
              maxLength={maxLength}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end text-xs text-gray-600 dark:text-gray-400">
              글자수: {content.length} / {maxLength}
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSave}
              className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors"
            >
              <img
                src={Folder}
                alt="Folder"
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              임시 저장
            </button>
            <button
              onClick={handleModalOpen}
              className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
            >
              <img
                src={PencilWriting}
                alt="Pencil Writing"
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              작성 완료
            </button>
          </div>

          {/* AI 분석 결과 표시 */}
          {emotionResult && (
            <div className="mt-4 p-4 bg-blue-100 rounded-lg text-blue-800">
              AI 분석 결과: {emotionResult}
            </div>
          )}
        </div>
      </div>

      {/* 모달이 표시될 때만 MgModal 컴포넌트를 렌더링 */}
      {showModal && <MgModal content={content} onClose={handleModalClose} />}
    </>
  );
};

export default MgWriting;
