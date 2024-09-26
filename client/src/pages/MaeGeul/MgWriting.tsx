import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 임포트
import Header from "../../components/Header";
import { analyzeEmotion } from "../../api/analyzeApi"; // 분석 API import
import { motion } from "framer-motion";

import MgModal from "./MgModal"; // 모달 컴포넌트 임포트
import { Iconify } from "../../dashboardComponents/iconify";
import MuditaImage from "../../Image/mudita_bot.png";
import { MdOutlineMail } from "react-icons/md";

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
  const [isContentEditable, setIsContentEditable] = useState(true); // 내용을 수정할 수 있는지 여부를 관리하는 상태
  const [progressBarValue, setProgressBarValue] = useState(80); // ProgressBar 값을 상태로 관리
  const [diaryId, setDiaryId] = useState(null); // 일기 저장 후 반환된 diaryId
  const [diarySaved, setDiarySaved] = useState(false); // 일기 저장 여부 확인
  const [sentences, setSentences] = useState<string[]>([]);
  const maxLength = 500;

  const { highlightedLabels, highlightedColor } = useHighlightContext(); // 강조된 라벨과 색상 가져오기
  const { pleasantness, energy } = useMoodContext();
  // UserContext에서 사용자 정보 가져오기
  const { user } = useUser();

  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 호출

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

  // emotionResult가 변경될 때마다 문장 단위로 나눠 상태를 업데이트
  useEffect(() => {
    if (emotionResult) {
      const updatedSentences = emotionResult
        .split("\n")
        .filter((sentence) => sentence.trim() !== ""); // 빈 문장을 제거

      setSentences(updatedSentences);
      console.log("Updated Sentences:", updatedSentences); // 콘솔로 확인
    }
  }, [emotionResult]);

  // 감정 분석 결과를 모달에서 받아오는 콜백 함수
  const handleAnalyzeComplete = (result: string) => {
    setEmotionResult(result); // 분석 결과 상태 업데이트
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
      setDiaryId(result.diary_id); // 반환된 diary_id 저장
      setDiarySaved(true); // 일기 저장 상태 업데이트
      console.log(
        `일기가 성공적으로 저장되었습니다. 일기 ID: ${result.diary_id}`
      );
    } catch (error) {
      console.error("일기 저장 중 오류 발생:", error);
    }
  };

  const handleSaveEmotionAnalysis = async () => {
    try {
      console.log("Saving emotion analysis with diaryId:", diaryId);
      console.log("Sentences to save:", sentences);

      const emotionResultString = sentences.join(" "); // 배열을 하나의 문자열로 변환

      const response = await fetch(`${BASE_URL}/api/emotion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.user_id,
          diary_id: diaryId,
          emotion_result: emotionResultString, // 문자열로 전송
        }),
      });

      if (!response.ok) {
        throw new Error("감정 분석 결과 저장 중 오류가 발생했습니다.");
      }

      const result = await response.json();
      console.log("감정 분석 결과가 성공적으로 저장되었습니다:", result);

      // 팝업창 띄우기
      const shouldRedirect = window.confirm(
        "감정 분석 결과가 성공적으로 저장되었습니다. 대시보드로 이동하시겠습니까?"
      );

      // 사용자가 확인을 누르면 대시보드로 리디렉션
      if (shouldRedirect) {
        navigate("/dashboard"); // "/dashboard" 경로로 리디렉션
      }
    } catch (error) {
      console.error("감정 분석 결과 저장 중 오류 발생:", error);
    }
  };

  const handleClick = () => {
    handleModalOpen(); // 모달 열기
    handleSaveMoodData(); // 감정 데이터 저장
    handleSaveDiary();
    setIsContentEditable(false); // 내용 수정 불가 상태로 전환
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

  const contentReset = () => {
    setContent("");
  };

  // emotionResult가 업데이트되면 ProgressBar 값을 100으로 업데이트
  useEffect(() => {
    if (emotionResult) {
      setProgressBarValue(100); // emotionResult가 있을 때 ProgressBar 값을 100으로 변경
    }
  }, [emotionResult]); // emotionResult가 변경될 때 실행

  return (
    <>
      <Header />
      <div className="w-[1140px] relative mt-10 mx-auto font-['font-plus-jakarta-sans']">
        {/* 텍스트 (ProgressBar 왼쪽 끝에 위치) */}
        <div className="absolute top-[-2rem] left-0 z-10 font-bold text-scampi-700 dark:text-scampi-300 font-bold leading-10">
          3단계: 감정 표현하기
        </div>
        {/* Progress Bar (가운데에 위치) */}
        <div className="w-full flex justify-center">
          <ProgressBar value={progressBarValue} />
        </div>
      </div>
      <motion.div
        className="flex w-[1140px] h-[700px] mx-auto p-0 bg-base dark:bg-gray-600 mt-10 relative font-['font-plus-jakarta-sans']"
        initial={{ opacity: 0, scaleX: 0.5 }} // 작고, 투명하게 시작
        animate={{ opacity: 1, scaleX: 1 }} // 원래 크기로 커지며 펼쳐짐
        transition={{ duration: 1, ease: "easeOut" }} // 부드러운 애니메이션
      >
        {/* 왼쪽 컨텐츠 */}
        <motion.div
          className="w-1/2 h-full p-4 bg-purple-100 rounded-3xl shadow-md dark:bg-gray-700"
          initial={{ scaleX: 0 }} // 초기 가로 크기 0
          animate={{ scaleX: 1 }} // 가로 크기가 100%로 커짐
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "center right" }} // 왼쪽에서 중앙으로 펼쳐짐
        >
          {emotionResult ? (
            // 편지가 펼쳐지는 애니메이션 효과 추가
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }} // 작고, 투명하고, 아래쪽에 위치
              animate={{ scale: 1, opacity: 1, y: 0 }} // 크기가 원래대로 커지며, 위로 올라옴
              transition={{ duration: 1, ease: "easeOut" }} // 애니메이션 지속 시간과 부드러운 효과 적용
              className="mx-auto text-scampi-800 font-bold text-xl dark:text-white mb-5"
            >
              <div className="User w-96 h-11 text-scampi-800 font-bold text-2xl leading-10 dark:text-white mb-5">
                무디타의 편지 💌
              </div>
              <motion.div
                initial={{ scaleX: 0 }} // 가로 크기를 0으로 시작 (접힌 상태)
                animate={{ scaleX: 1 }} // 가로 크기를 펼치는 애니메이션
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }} // 약간의 딜레이 후 애니메이션 시작
                className="BackgroundBorder relative p-5 bg-white rounded-2xl border border-black/10 text-base before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-0 before:border-t-[15px] before:border-t-white before:border-l-[15px] before:border-l-transparent before:border-r-[15px] before:border-r-transparent before:border-b-0"
              >
                {emotionResult &&
                  emotionResult.split("\n").map((sentence, index) => (
                    <p key={index} className="mb-2">
                      {sentence}
                    </p>
                  ))}
              </motion.div>

              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center mt-5">
                  <MdOutlineMail className="w-20 h-20 text-red-400" />{" "}
                  {/* 우체통 아이콘 */}
                </div>

                <motion.button
                  onClick={handleSaveEmotionAnalysis}
                  className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors mt-2"
                  whileHover={{ scale: 1.05 }} // 버튼에 마우스를 올리면 약간 확대되는 효과
                >
                  편지받기
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // emotionResult가 없을 때 기존 가이드 내용 표시
            <>
              <div className="User w-96 h-11 text-scampi-800 font-bold text-2xl leading-10 dark:text-white mb-5">
                {user?.profile_name}님의 감정 일기 💟
              </div>
              <div className="Container flex flex-col space-y-2">
                <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10">
                  <div className="text-zinc-800 text-lg">
                    <p className="text-scampi-800 font-bold text-xl mb-1">
                      작성 안내
                    </p>
                    <p className="text-scampi-800 font-bold text-sm leading-5">
                      <br />
                      1. 감정을 느낀 구체적인 "상황"과 그 때 나의 "행동",
                      "생각"을 <br /> 포함해 적어보세요.
                      <br />
                      2. 조금씩이라도 매일 꾸준히 적다보면 나의 마음을 건강하게
                      <br />
                      변화시켜 갈 수 있어요.
                      <br />
                      3. 감정을 느꼈을 때 나의 신체적 변화에 대해서 적어보는
                      것도 도움이 되어요.
                    </p>
                  </div>
                </div>

                <div className="BackgroundBorder p-5 bg-white rounded-2xl border border-black/10 font-['font-plus-jakarta-sans']">
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
                              width: "25px",
                              height: "25px",
                              marginLeft: "5px",
                              backgroundColor: highlightedColor,
                              borderRadius: "3px",
                            }}
                          />
                        )}
                        <br />
                        <br />
                        오늘의 감정 태그를 선택해주세요
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
              </div>
            </>
          )}
        </motion.div>

        {/* 오른쪽 컨텐츠 */}
        <motion.div
          className="w-1/2 h-full p-8 bg-purple-100 rounded-3xl shadow-md dark:bg-gray-700 flex flex-col justify-between"
          initial={{ scaleX: 0 }} // 초기 가로 크기 0
          animate={{ scaleX: 1 }} // 가로 크기가 100%로 커짐
          transition={{ duration: 1, ease: "easeOut" }} // 약간의 딜레이 추가
          style={{ transformOrigin: "center left" }} // 오른쪽에서 중앙으로 펼쳐짐
        >
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
              disabled={!isContentEditable} // isContentEditable 값에 따라 비활성화 여부 결정
            />
            <div className="flex justify-end text-xs text-gray-600 dark:text-gray-400">
              글자수: {content.length} / {maxLength}
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={contentReset}
              className="bg-scampi-400 dark:bg-scampi-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-scampi-600 dark:hover:bg-scampi-700 transition-colors bg-scampi-500"
            >
              내용 초기화
            </button>
            <button
              onClick={handleClick}
              className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors bg-scampi-500"
            >
              작성 완료
            </button>
          </div>
        </motion.div>
      </motion.div>

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
