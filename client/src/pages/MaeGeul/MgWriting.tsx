import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { analyzeEmotion } from "../../api/analyzeApi"; // 분석 API import
import PencilWriting from "../../Icon/Pencil Writing.png";
import Folder from "../../Icon/Folder.png";
import MgModal from "./MgModal"; // 모달 컴포넌트 임포트

import { useHighlightContext } from "../../context/HighlightContext"; // Context 임포트
import { useMoodContext } from "../../context/MoodContext"; // Context 훅 임포트
import { useUser } from "../../context/UserContext"; // UserContext 임포트
import ProgressBar from "../../components/ProgressBar";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const MgWriting: React.FC = () => {
  const [content, setContent] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedDateOnly, setFormattedDateOnly] = useState(""); // 날짜만 표기할 상태 추가
  const [emotionResult, setEmotionResult] = useState<string | null>(null); // 분석 결과 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const maxLength = 500;
  const { highlightedLabels, highlightedColor } = useHighlightContext(); // 강조된 라벨과 색상 가져오기
  const { pleasantness, energy } = useMoodContext();
  // UserContext에서 사용자 정보 가져오기
  const { user } = useUser();

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

    const formatted = `${today.getHours()}시 ${today.getMinutes()}분`;
    setFormattedDate(formatted);

    // 날짜만 포함한 포맷
    const formattedOnlyDate = `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일`;
    setFormattedDateOnly(formattedOnlyDate);
  }, []);

  const [title, setTitle] = useState(`${formattedDateOnly}의 일기`); // 템플릿 리터럴로 초기값 설정
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    // formattedDate가 변경될 때 title도 업데이트
    setTitle(`${formattedDateOnly}의 일기`);
  }, [formattedDateOnly]);

  // 감정 분석 결과를 모달에서 받아오는 콜백 함수
  const handleAnalyzeComplete = (result: string) => {
    setEmotionResult(result); // 분석 결과 상태 업데이트
  };

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

  const handleSaveMoodData = async () => {
    try {
      const moodData = {
        user_id: user?.user_id, // 로그인된 사용자 ID
        pleasantness: pleasantness, // MoodContext에서 가져온 기분 값
        energy: energy, // MoodContext에서 가져온 에너지 값
        label: highlightedLabels.join(", "), // 선택된 레이블을 문자열로 변환
        color: colorName, // 감정 색상 (문자열)
      };

      console.log(moodData);

      const response = await fetch(`${BASE_URL}/api/save-moodmeter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 반드시 JSON 형식으로 설정
        },
        body: JSON.stringify(moodData), // 반드시 JSON.stringify로 직렬화된 데이터 전송
      });

      if (!response.ok) {
        throw new Error("데이터 저장 중 오류가 발생했습니다.");
      }

      const result = await response.json();
      console.log(
        `데이터가 성공적으로 저장되었습니다. 저장된 ID: ${result.id}`
      );
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다.", error);
    }
  };

  const handleSaveDiary = async () => {
    try {
      const diaryData = {
        user_id: user?.user_id, // 로그인된 사용자 ID
        title: title,
        content: content,
        color: colorName,
      };

      const response = await fetch(`${BASE_URL}/api/diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diaryData),
      });

      if (!response.ok) {
        throw new Error("일기 저장 중 오류가 발생했습니다.");
      }

      const result = await response.json();
      alert(`일기가 성공적으로 저장되었습니다. 일기 ID: ${result.diary_id}`);
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error);
    }
  };

  const handleClick = () => {
    handleModalOpen(); // 모달 열기
    handleSaveMoodData(); // 감정 데이터 저장
    handleSaveDiary();
  };

  const handleModalOpen = () => {
    setShowModal(true); // 모달을 열기 위한 함수
  };

  const handleModalClose = () => {
    setShowModal(false); // 모달을 닫기 위한 함수
  };

  const colorName = highlightedColor ? getColorName(highlightedColor) : "";

  const handleLabelClick = (label: string) => {
    setSelectedLabels((prevLabels) => {
      if (prevLabels.includes(label)) {
        // 이미 포함된 키워드를 제거
        const updatedLabels = prevLabels.filter(
          (prevLabel) => prevLabel !== label
        );
        updateTitle(updatedLabels); // title 업데이트
        return updatedLabels;
      } else {
        // 키워드를 추가
        const updatedLabels = [...prevLabels, label];
        updateTitle(updatedLabels); // title 업데이트
        return updatedLabels;
      }
    });
  };

  // title 업데이트 함수 (키워드 배열을 기반으로 제목 생성)
  const updateTitle = (labels: string[]) => {
    if (labels.length === 0) {
      setTitle(`${formattedDateOnly}의 일기`); // 선택된 키워드가 없으면 기본 제목
    } else {
      setTitle(`${formattedDateOnly}의 일기 #${labels.join("#")}`);
    }
  };

  const [showWarning, setShowWarning] = useState(false); // 경고 메시지 상태 추가

  return (
    <>
      <Header />
      <div className="w-[1140px] relative mt-10 mx-auto">
        {/* 텍스트 (ProgressBar 왼쪽 끝에 위치) */}
        <div className="absolute top-[-2rem] left-0 z-10 font-bold text-scampi-700 dark:text-scampi-300 font-bold font-['DM Sans'] leading-10">
          3단계: 감정 표현하기
        </div>
        {/* Progress Bar (가운데에 위치) */}
        <div className="w-full flex justify-center">
          <ProgressBar value={80} />
        </div>
      </div>

      <div className="flex w-full h-screen p-10 bg-gray-100 dark:bg-gray-600">
        {/* 왼쪽 가이드 */}
        <div className="w-1/2 h-full p-8 bg-white rounded-3xl shadow-md dark:bg-gray-700">
          <div className="User w-96 h-11 text-scampi-800 font-bold text-2xl leading-10 dark:text-white mb-5">
            {user?.profile_name}님의 감정 일기 💖
          </div>
          <div className="Container flex flex-col space-y-2">
            <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10">
              <div className="text-zinc-800 text-lg">
                <p className="text-scampi-800 font-bold text-xl mb-1">
                  작성 안내
                </p>
                <p className="text-scampi-800 font-bold text-m">
                  <br />
                  1. 감정을 느낀 구체적인 "상황"과 그 때 나의 "행동", "생각"을
                  포함해 적어보세요.
                  <br />
                  2. 조금씩이라도 매일 꾸준히 적다보면 나의 마음을 건강하게
                  변화시켜갈 수 있어요.
                  <br />
                  3. 감정을 느꼈을 때 나의 신체적 변화에 대해서 적어보는 것도
                  도움이 되어요.
                </p>
              </div>
            </div>

            <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10">
              <div className="text-zinc-800 text-lg">
                <div className="mt-5 text-gray-700 dark:text-gray-300">
                  <p className="text-scampi-800 font-bold text-xl mb-5">
                    오늘의 무드 진단 결과
                  </p>

                  <p className="text-scampi-800 font-bold text-m">
                    무드 컬러: {colorName}
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
                        onClick={() => handleLabelClick(label)}
                        className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-3 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors ml-1"
                      >
                        {label}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* AI 분석 결과를 왼쪽 가이드에 표시 */}
            {emotionResult && (
              <div className="BackgroundBorder p-5 bg-blue-100 rounded-2xl border border-blue-300">
                <div className="text-blue-800 text-lg">
                  AI 분석 결과:
                  <br />
                  {emotionResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 작성 부분 */}
        <div className="w-1/2 h-full p-8 bg-purple-100 rounded-3xl shadow-md dark:bg-gray-700 flex flex-col justify-between">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="User w-120 h-11 text-scampi-800 font-bold text-xl dark:text-white">
                {title}
              </div>
              <span className="text-sm text-neutral-500">{formattedDate}</span>
            </div>
            <textarea
              className="w-full h-[400px] bg-purple-100 text-lg mt-4 p-4 border border-transparent rounded-lg resize-none dark:bg-gray-600 dark:text-white"
              placeholder={`${
                user?.profile_name || ""
              }님의 오늘 하루 어떠셨나요? 오늘 내가 느낀 감정을 일으킨 상황과 함께 구체적으로 작성해보세요.`}
              maxLength={maxLength}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end text-xs text-gray-600 dark:text-gray-400">
              글자수: {content.length} / {maxLength}
            </div>
          </div>

          {/* 경고 메시지 표시 */}
          {showWarning && (
            <div className="text-red-500 text-xl text-bold">
              글자 수는 최대 500자까지만 입력 가능합니다.
            </div>
          )}

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleClick}
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
              onClick={handleClick}
              className={`bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors ${
                showWarning ? "bg-gray-400 cursor-not-allowed" : "bg-scampi-500"
              }
            `}
              disabled={showWarning}
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
        </div>
      </div>

      {/* 모달이 표시될 때만 MgModal 컴포넌트를 렌더링 */}
      {showModal && (
        <MgModal
          content={content}
          onClose={handleModalClose}
          onAnalyzeComplete={handleAnalyzeComplete} // 콜백 함수 전달
        />
      )}
    </>
  );
};

export default MgWriting;
