import React, { useState } from "react";
import aiIcon from "../../Icon/ai.png";
import { analyzeEmotion } from "../../api/analyzeApi"; // 분석 API import
import "./MgModal.css";

interface ModalProps {
  content: string; // content prop 추가
  onClose: () => void;
}

const MgModal: React.FC<ModalProps> = ({ content, onClose }) => {
  const [emotionResult, setEmotionResult] = useState<string | null>(null); // 분석 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleAnalyze = async () => {
    setLoading(true); // 분석 시작 시 로딩 상태를 true로 설정
    try {
      // AI 분석 호출
      const emotion = await analyzeEmotion(content);
      setEmotionResult(emotion); // 분석 결과 상태 저장
      alert(`감정 분석 결과: ${emotion}`);
    } catch (error) {
      console.error("감정 분석 중 오류 발생:", error);
    } finally {
      setLoading(false); // 분석이 완료되면 로딩 상태를 false로 설정
    }
  };

  return (
    // 모달 팝업의 배경을 설정하고, 화면 중앙에 나타나도록 스타일링
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* 모달 팝업의 메인 컨테이너 */}
      <div className="Container w-[1000px] h-[500px] relative bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        {/* 사용자 안내 문구 */}
        <div className="Paragraph text-center text-scampi-700 text-2xl font-bold font-['DM Sans'] leading-8 mb-10 mt-20">
          린다님의 N번째 감정일기 작성이 완료되었어요! <br />
          꾸준히 감정일기를 작성하면, 나의 마음 지도를 <br />
          만들고 자기 돌봄 습관을 만들어 갈 수 있어요.
        </div>

        {/* 아래 부분 - AI 하루진단 안내, 아이콘, 이용 약관 */}
        <div className="flex items-center justify-between w-full">
          {/* 아이콘 이미지 */}
          <div className="flex items-center justify-center w-1/6">
            <img
              src={aiIcon}
              alt="ai_icon"
              className="w-16 h-16 bg-scampi-500 rounded-full object-cover"
            />
          </div>

          {/* AI 하루진단 안내 및 설명 */}
          <div className="Paragraph text-left text-slate-400 text-lg font-bold font-['DM Sans'] w-4/6 mt-10">
            무디타봇에게 [AI 하루진단]을 받아보세요. 린다님이 작성한 일기 내용을
            바탕으로 오늘 느낀 감정을 분석하고 그에 맞는 기분 가이드를 드려요.
            <div className="text-zinc-500 text-sm font-['Noto Sans KR'] leading-5 mt-10">
              <input type="checkbox" className="mr-2" />
              AI 분석을 위해 OpenAI에 작성글을 전송하는 것에 동의합니다. <br />
              <a href="#" className="underline text-xs">
                [이용 약관 자세히 보기]
              </a>
            </div>
          </div>

          {/* AI 하루진단 버튼 */}
          <div className="flex items-center justify-center w-1/6">
            <button
              onClick={handleAnalyze} // 버튼 클릭 시 감정 분석 실행
              className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors"
            >
              AI 하루진단
            </button>
          </div>
        </div>

        {/* 로딩 상태일 때 로딩 애니메이션 표시 */}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="loader"></div> {/* 간단한 로딩 애니메이션 */}
          </div>
        )}

        {/* 분석 결과 표시 */}
        {emotionResult && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg text-blue-800">
            분석 결과: {emotionResult}
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-scampi-500 text-white py-2 px-4 rounded shadow hover:bg-scampi-400 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default MgModal;
