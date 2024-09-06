//client2/src/pages/MaeGeul/MgModal.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const MgModal: React.FC<ModalProps> = ({ message, onClose }) => {
    const navigate = useNavigate();
    const handleAIDiagClick = () => {
        navigate('/AIWriting'); // 'AI 하루진단' 페이지로 이동하도록 설정
    };
  return (
    // 모달 팝업의 배경을 설정하고, 화면 하단에 나타나도록 스타일링
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
      {/* 모달 팝업의 메인 컨테이너 */}
      <div className="Container w-[2000px] h-[300px] relative bg-white rounded-t-lg shadow-lg mb-4">
        {/* 모달 내부 콘텐츠를 감싸는 Wrapper */}
        <div className="Wrapper w-full h-full relative">
          {/* 배경을 흰색으로 설정하는 백그라운드 레이어 */}
          <div className="absolute w-full h-full bg-white" />

          {/* 사용자 안내 문구 */}
          <div className="Paragraph text-center absolute left-[50px] right-[50px] top-[20px] text-scampi-700 text-2xl font-bold font-['DM Sans'] leading-8">
            'user'님의 N번째 감정일기 작성이 완료되었어요! <br />
            꾸준히 감정일기를 작성하면, 나의 마음 지도를 <br />
            만들고 자기 돌봄 습관을 만들어 갈 수 있어요.
          </div>

          {/* AI 하루진단 안내 및 설명 */}
          <div className="absolute text-center left-[200px] top-[150px] text-slate-400 text-lg font-bold font-['DM Sans']">
            무디타봇에게 [AI 하루진단]을 받아보세요. </div>
          <div className="absolute text-center left-[20px] top-[170px] text-slate-400 text-lg font-normal font-['DM Sans']">
            'user'님이 작성한 일기 내용을 바탕으로 오늘 느낀 감정을 분석하고 그에 맞는 기분 가이드를 드려요.
          </div>

          {/* 이용 약관 및 동의 설명 */}
          <div className="absolute left-[20px] top-[250px] text-zinc-500 text-sm font-['Noto Sans KR'] leading-5">
            AI 분석을 위해 OpenAI에 작성글을 전송하는 것에 동의합니다. <br />
            <a href="#" className="underline">[이용 약관 자세히 보기]</a>
          </div>
          {/* AI 하루진단 버튼 */}
          <button 
            onClick={handleAIDiagClick} 
            className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors mt-4"
          >
            AI 하루진단
          </button>

          {/* 닫기 버튼 */}
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 bg-scampi-500 text-white py-2 px-4 rounded shadow hover:bg-scampi-400 transition"
          >
            닫기
          </button>

        </div>
      </div>
    </div>
  );
};

export default MgModal;


