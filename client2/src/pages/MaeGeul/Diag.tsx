// src/pages/Diag.tsx
// src/pages/Diag.tsx
import React, { useState } from 'react';
import MoodSlider from '../../components/MoodSlider'; 
import EnergySlider from '../../components/EnergySlider'; 
import { Link } from 'react-router-dom'; 
import Modal from '../../components/Modal';

const Diag: React.FC = () => {
  const [moodValue, setMoodValue] = useState<number | null>(null);
  const [energyValue, setEnergyValue] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMoodChange = (value: number) => {
    setMoodValue(value);
  };

  const handleEnergyChange = (value: number) => {
    setEnergyValue(value);
  };

  const handleSubmit = () => {
    if (moodValue === null || energyValue === null) {
      setShowModal(true);
      return;
    }
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setMoodValue(null);
    setEnergyValue(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // 상태를 초기화할 필요는 없습니다.
  };

  const renderContent = () => {
    if (submitted) {
      if (moodValue !== null && energyValue !== null) {
        const totalValue = moodValue + energyValue;
        return (
          <div className="text-center p-4">
            <p className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-4">
              오늘 'user'님의 무드 컬러는 <br /> '{totalValue}'이에요.
            </p>
            <div className="w-full p-20 ml-10 mr-10 bg-red-100 rounded-3xl flex justify-center items-center">
            <p className="text-scampi-700 text-3xl font-bold font-['DM Sans'] leading-7 text-center">
                무드컬러 '{totalValue}' 의 뜻은 <br />
                높은 에너지를 가지고 있지만 편안함은 낮아요.
            </p></div>
            <div className="w-full p-6 ml-10 mr-10 bg-slate-100 rounded-3xl flex justify-center items-center">
            <p className="text-scampi-700 text-lg font-bold font-['DM Sans'] leading-7 text-center">
                내 감정을 더욱 정확하게 알아보기 위해서, <br />
                지금 바로 감정 일기를 작성하러 가볼까요?
            </p></div>
            <div className="flex justify-center gap-4 p-6">
              <button onClick={handleRetry} className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
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
    }
    return (
      <div className="flex flex-col items-center">
        <MoodSlider onValueChange={handleMoodChange} onSubmit={handleSubmit} />
        <EnergySlider onValueChange={handleEnergyChange} onSubmit={handleSubmit} />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {renderContent()}
      {showModal && <Modal message="점수를 입력해주세요!" onClose={handleModalClose} />}
    </div>
  );
};

export default Diag;
